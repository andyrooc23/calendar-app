import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.SPORTSDB_KEY;

app.get('/api/schedule', async (req, res) => {
  const team = Array.isArray(req.query.team) ? req.query.team[0] : req.query.team;

  if (typeof team !== 'string') {
    res.status(400).json({ error: 'Invalid or missing team name' });
    return;
  }

  try {
    const searchUrl = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/searchteams.php?t=${encodeURIComponent(team)}`;
    const searchResp = await axios.get(searchUrl);
    const teamId = searchResp.data?.teams?.[0]?.idTeam;

    if (!teamId) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }

    const eventsUrl = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsnext.php?id=${teamId}`;
    const eventsResp = await axios.get(eventsUrl);

    const games = (eventsResp.data?.events || []).map((event: any) => ({
      title: event.strEvent,
      start: new Date(`${event.dateEvent}T${event.strTime || '00:00:00'}`),
      end: new Date(`${event.dateEvent}T${event.strTime || '00:00:00'}`),
      allDay: false,
    }));

    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching schedule' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
