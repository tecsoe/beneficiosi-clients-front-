const findShowsQuantity = (shows) => {
    var availableSeats = 0;
    shows.forEach(show => {
        show?.showToZones?.forEach((zone) => {
            availableSeats = availableSeats + zone?.availableSeats;
        });
    });

    return availableSeats;
}

export default findShowsQuantity;