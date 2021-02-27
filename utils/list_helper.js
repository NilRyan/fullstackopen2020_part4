const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
 return blogs.reduce((accumulator, currentValue) => {
  return  accumulator + currentValue.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const sortedByFavorite = blogs.sort((blogA, blogB) => {
    return blogB.likes - blogA.likes;
  })
  return sortedByFavorite[0];
}

const mostBlogs = (blogsArray) => {
  const sortedByBlogCount = blogsArray.sort((blogA, blogB) => {
    return blogB.blogs - blogA.blogs;
  })

  const {author, blogs} = sortedByBlogCount[0];
  return {author, blogs};
}

const mostLikes = (blogsArray) => {
  const sortedByLikes = blogsArray.sort((blogA, blogB) => {
    return blogB.likes - blogA.likes;
  })
  const {author, likes} = sortedByLikes[0];
  return {author, likes}
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}