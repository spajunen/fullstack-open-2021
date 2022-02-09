const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    //const likes = blogs.map((b) => b.likes)
    const likesAdder = (sum, blogs) => {
        return sum + blogs.likes
    }
    return blogs.reduce(likesAdder,0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map((b) => b.likes)
    const max = Math.max(...likes)
    const mostLikes = blogs.find(b => b.likes === max)
    return mostLikes
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }