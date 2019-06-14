import { api } from '@/helpers';

async function fetch(url) {
  try {
    const response = await api.post('/api/video/fetch', { url });
    return response.data;
  } catch (error) {
    if (error.response) throw error.response.data;
  }
}

async function process({
  id,
  title,
  startTime,
  endTime,
  removeSilence,
  normalizeVolume,
  audioBitrate
}) {
  try {
    const response = await api.post(
      '/api/video/process',
      { id, startTime, endTime, removeSilence, normalizeVolume, audioBitrate },
      { responseType: 'blob' }
    );

    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = URL.createObjectURL(new Blob([response.data]));
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
    return;
  } catch (error) {
    if (error.response) throw error.response.data;
  }
}

export const videoService = {
  fetch,
  process
};
