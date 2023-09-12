const express = require('express');
const { IgApiClient } = require('instagram-private-api');

const app = express();
const port = 3000; // Change this to the desired port number

const ig = new IgApiClient();

async function getFollowers(username) {
  ig.state.generateDevice(username);
  await ig.account.login(username, '***'); // Replace PASS with the actual password

  const userSearch = await ig.user.searchExact(username); // Replace USER_TO_CHECK with the username to check
  const followersFeed = ig.feed.accountFollowers(userSearch.pk);
  const followers = await followersFeed.items();

  return followers.map(follower => follower.username);
}

app.get('/getFollowers/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const followers = await getFollowers(username);
    res.json({
      followers,
      totalFollowers: followers.length
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching followers.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});