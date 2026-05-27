import { useStoryblokApi } from '@storyblok/astro';
// We can just use standard fetch to get the JSON payload directly from Storyblok's Preview API!
const token = '3eqaktHo70jcrqzTOFVpRAtt';
const url = `https://api.storyblok.com/v2/cdn/stories/home?token=${token}&version=draft`;

console.log("Fetching Storyblok draft from URL:", url);

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("SUCCESS! Loaded Storyblok Payload:");
    console.log(JSON.stringify(data.story, null, 2));
  })
  .catch(err => {
    console.error("ERROR fetching Storyblok Payload:", err);
  });
