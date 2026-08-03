const { YoutubeTranscript } = require('youtube-transcript');
const pdf = require('pdf-parse');

/**
 * Extracts the transcript from a given YouTube video URL or ID.
 * @param {string} videoUrl - The URL of the YouTube video.
 * @returns {Promise<string>} The concatenated text of the transcript.
 */
const extractYouTubeTranscript = async (videoUrl) => {
  try {
    const transcriptArray = await YoutubeTranscript.fetchTranscript(videoUrl);
    // Combine the text of all transcript chunks
    const fullText = transcriptArray.map(t => t.text).join(' ');
    return fullText;
  } catch (error) {
    console.error("Error fetching YouTube transcript:", error);
    throw new Error("Could not extract transcript. The video might not have captions enabled.");
  }
};

/**
 * Parses raw text from a PDF data buffer.
 * @param {Buffer} dataBuffer - The raw buffer of the uploaded PDF file.
 * @returns {Promise<string>} The extracted text from the PDF.
 */
const extractPDFText = async (dataBuffer) => {
  try {
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Could not parse the PDF file.");
  }
};

module.exports = {
  extractYouTubeTranscript,
  extractPDFText
};
