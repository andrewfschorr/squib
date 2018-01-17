const squib = require('../squib');

/*
* Test inlining tempaltes as strings
*/
test('Template interpolation works', () => {
    const s = '<p>hello <%= name %></p>';
    const test = squib(s, {name: 'bob'});
    const expected = '<p>hello bob</p>';
    expect(test).toBe(expected);
});

test('Ternary operation works', () => {
    const s = '<p><%= (i % 2 === 0 ? "even" : "odd") %></p>';
    const test = squib(s, {i: 6});
    const expected = '<p>even</p>';
    expect(test).toBe(expected);
});

test('Ternary operation works... again', () => {
    const s = '<p><%= (i % 2 === 0 ? "even" : "odd") %></p>';
    const test = squib(s, {i: 5});
    const expected = '<p>odd</p>';
    expect(test).toBe(expected);
});

test('For loops work', () => {
    const s = `<ul><% for ( var i = 0; i < users.length; i++ ) { %><li><%= users[i] %></li><% } %></ul>`;
    const test = squib(s, {
        users: ['bob', 'joe', 'al']
    });
    const expected = '<ul><li>bob</li><li>joe</li><li>al</li></ul>';
    expect(test).toBe(expected);
});

/*
* Test templates as innerHTML as a script tag on the page
*/
test('Template interpolation works', () => {
    const el = document.createElement('script');
    el.type = 'text/javascript';
    el.setAttribute('class', 'tpl');
    el.innerHTML = '<p>hello <%= name %></p>'
    const test = squib(el, {name: 'bob'});
    const expected = '<p>hello bob</p>';
    expect(test).toBe(expected);
});

/*
* Test it works with async fetch call
*/
it('works with resolves', () => {
    expect.assertions(1);
    return expect().resolves.toEqual('Paul');
  });