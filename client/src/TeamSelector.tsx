import React from 'react';

interface TeamSelectorProps {
  selectedTeams: string[];
  setSelectedTeams: React.Dispatch<React.SetStateAction<string[]>>;
}

const allTeams: string[] = [
  'Golden State Warriors',
  'San Francisco Giants',
  'Los Angeles Lakers',
  'New York Yankees',
  'Dallas Cowboys',
  'Manchester United',
];

const TeamSelector: React.FC<TeamSelectorProps> = ({ selectedTeams, setSelectedTeams }) => {
  const toggleTeam = (team: string) => {
    if (selectedTeams.includes(team)) {
      setSelectedTeams(selectedTeams.filter(t => t !== team));
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  return (
    <div className="team-selector">
      <h2 style={{ textAlign: 'center' }}>Select Your Teams</h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          justifyItems: 'start',
        }}
      >
        {allTeams.map(team => (
          <li key={team}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={selectedTeams.includes(team)}
                onChange={() => toggleTeam(team)}
              />
              <span style={{ color: '#333', fontSize: '0.95rem' }}>{team}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamSelector;
