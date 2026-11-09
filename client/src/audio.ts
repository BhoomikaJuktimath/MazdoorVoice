const supportedTypes: Record<string, string> = {
  'audio/wav': 'recording.wav',
  'audio/x-wav': 'recording.wav',
  'audio/mpeg': 'recording.mp3',
  'audio/ogg': 'recording.ogg',
  'audio/flac': 'recording.flac',
  'audio/aac': 'recording.aac',
  'audio/mp4': 'recording.m4a',
  'audio/x-m4a': 'recording.m4a',
};

export async function preparePrismaAudio(input: Blob): Promise<{ blob: Blob; filename: string }> {
  const type = input.type.toLowerCase().split(';')[0].trim();
  if (supportedTypes[type]) return { blob: input, filename: supportedTypes[type] };
  if (type !== 'audio/webm' && type !== 'video/webm') {
    throw new Error('Choose WAV, MP3, OGG, FLAC, AAC or M4A audio.');
  }

  const context = new AudioContext();
  try {
    const decoded = await context.decodeAudioData(await input.arrayBuffer());
    if (decoded.duration > 30) throw new Error('Prisma accepts recordings up to 30 seconds. Please record a shorter clip.');
    const sampleRate = Math.min(44100, Math.max(8000, decoded.sampleRate));
    const frames = Math.floor(decoded.length * sampleRate / decoded.sampleRate);
    const samples = new Float32Array(frames);
    const channels = Array.from({ length: decoded.numberOfChannels }, (_, i) => decoded.getChannelData(i));
    for (let i = 0; i < frames; i++) {
      const sourcePosition = i * decoded.sampleRate / sampleRate;
      const left = Math.floor(sourcePosition);
      const fraction = sourcePosition - left;
      for (const channel of channels) {
        const a = channel[left] || 0;
        const b = channel[Math.min(left + 1, channel.length - 1)] || 0;
        samples[i] += (a + (b - a) * fraction) / channels.length;
      }
    }

    const wav = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(wav);
    const writeText = (offset: number, value: string) => [...value].forEach((char, i) => view.setUint8(offset + i, char.charCodeAt(0)));
    writeText(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeText(8, 'WAVE');
    writeText(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeText(36, 'data');
    view.setUint32(40, samples.length * 2, true);
    for (let i = 0; i < samples.length; i++) {
      const sample = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(44 + i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    }
    return { blob: new Blob([wav], { type: 'audio/wav' }), filename: 'recording.wav' };
  } finally {
    await context.close();
  }
}
