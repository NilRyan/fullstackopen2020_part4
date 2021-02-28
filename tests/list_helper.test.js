const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('favorite blog', () => {
  const listOfBlogs = [
    {
      title: 'Considered Harmful',
      author: 'Mr. Pogi',
      likes: 165,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 41241,
    },
  ];

  test('given an array of blogs, return most liked blog', () => {
    const result = listHelper.favoriteBlog(listOfBlogs);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 41241,
    });
  });
});

describe('most blogs', () => {
  const listOfBlogs = [
    {
      title: 'Considered Harmful',
      author: 'Mr. Pogi',
      blogs: 165,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      blogs: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      blogs: 41241,
    },
  ];

  test('given an array of blogs, return author with most blogs and blog count', () => {
    const result = listHelper.mostBlogs(listOfBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 41241,
    });
  });
});

describe('most liked blog', () => {
  const listOfBlogs = [
    {
      title: 'Considered Harmful',
      author: 'Mr. Pogi',
      blogs: 165,
      likes: 4214,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      blogs: 5,
      likes: 21421,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      blogs: 41241,
      likes: 214,
    },
  ];

  test('given an array of blogs, return author with most likes and likes count', () => {
    const result = listHelper.mostLikes(listOfBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 21421,
    });
  });
});
