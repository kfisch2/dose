const { format_date } = require('../utils/helpers');

test('format_date() returns a rearanged date string', () => {
    const date = '2023-01-22';

    expect(format_date(date)).toBe('01/22/2023');
});

