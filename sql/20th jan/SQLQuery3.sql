use assignment2
	select distinct top(1) Games, count(distinct Team) as NoOfCountries
	from athlete_events
	group by Games
	order by NoOfCountries;
	select distinct top(1) Games, count(distinct Team) as NoOfCountries
	from athlete_events
	group by Games
	order by NoOfCountries desc;
