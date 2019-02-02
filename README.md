# Netdata Blog

The official blog of Netdata.

## Adding a new post

Blog posts are written in Markdown format within the `content/posts` directory. To create a new post, give:

```sh
hugo new posts/new-post-title.md
```

Please use 'lisp-case' for the filename.

## Rendering the site

To render the site, give:

```sh
hugo
```

The generated static files are placed into the `public` folder.

## Deploying to production

To deploy the blog, just serve the static files in the `public` directory.

TODO: Netlify deployment instructions pending!
