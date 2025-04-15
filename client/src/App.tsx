import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

import { dateFnsLocalizer } from 'react-big-calendar';

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

const dummyEvents = [
  {
    title: 'Warriors vs Lakers',
    start: new Date('2025-04-22T19:30:00'),
    end: new Date('2025-04-22T22:00:00'),
    allDay: false,
  },
  {
    title: 'Giants vs Dodgers',
    start: new Date('2025-04-24T13:00:00'),
    end: new Date('2025-04-24T16:00:00'),
    allDay: false,
  },
];

function App() {
  const [events] = useState(dummyEvents);

  return (
    <div className="App">
      <h1>Sports Game Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: '50px' }}
      />
    </div>
  );
}

export default App;
