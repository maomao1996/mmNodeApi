module.exports = async(ctx, next, axios) => {
  ctx.redirect(`/playlist/detail/163?${ctx.querystring}`)
}
