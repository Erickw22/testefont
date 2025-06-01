function ListarPosts({ posts }) {
  return (
    <div className="space-y-4" role="list">
      {posts.map(post => (
        <article
          key={post._id}
          className="border p-4 rounded shadow"
          role="listitem"
          aria-label={`Post titled ${post.title}`}
        >
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <small>
            Por: {post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Anônimo'}{' '}
            ({post.author?.email || 'Sem email'})
          </small>
        </article>
      ))}
    </div>
  );
}

export default ListarPosts;
