import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

import TeamSelector from './TeamSelector';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

interface GameEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

function App() {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [events, setEvents] = useState<GameEvent[]>([]);

  // Fetch events when selectedTeams changes
  // and when the component mounts
  // This will fetch the events for all selected teams
  // and update the events state
  // The events state will be passed to the Calendar component
  // The Calendar component will render the events
  // The events will be displayed in the calendar
  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents: GameEvent[] = [];

      for (const team of selectedTeams) {
        console.log("getting events for", team);
        try {
          console.log(`http://localhost:3000/api/schedule?team=${team}`)
          const res = await fetch(`http://localhost:3000/api/schedule?team=${team}`);
          const data = await res.json();
          const validEvents = data.map((event: GameEvent) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          })).filter((event: GameEvent) => !isNaN(event.start.getTime()) && !isNaN(event.end.getTime()));
          console.log("valid events", validEvents);
          allEvents.push(...validEvents);
        } catch (err) {
          console.error(`Failed to fetch schedule for ${team}`, err);
        }
      }

      setEvents(allEvents);
    };

    if (selectedTeams.length > 0) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [selectedTeams]);

  return (
    <div className="app-outer">
      <div className="app-inner">
        <h1>Sports Game Calendar</h1>
        <TeamSelector selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} />
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
