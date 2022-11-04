# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Create Blog Post

1. Create a branch for your post.
2. In your branch create a file like `blog/2022-01-01-my-blog-slug.md` or (better since can add images in folder alongside the post) `blog/2022-01-01-my-blog-slug/index.md` (so `blog/<yyyy-mm-dd>-<url-slug-you-want>.md` or `blog/<yyyy-mm-dd>-<url-slug-you-want>/index.md`).
3. Add [frontmater](https://docusaurus.io/docs/create-doc#doc-front-matter) metadata at top of post (use an existing post as an example or starting point). Add yourself to [`/blog/authors.yml`](/blog/authors.yml) if needed.
4. Create your post in markdown, or .mdx [like this one](https://raw.githubusercontent.com/netdata/blog/improve-readme/blog/2022-09-01-how-netdatas-machine-learning-works.mdx) if need to embed a YouTube video or do anything else a bit more fancy.
5. Optionally build site locally with `npm install` and then `npm run start`. If builds successfully a local version of the blog will be at: http://localhost:3000/
6. Create a PR from your branch into `master` (this will trigger a deployment preview). 

#### Tips

- Use `![my image alt text](url to image)` for images.
- For `tags`, pick from [existing tags](https://blog.netdata.cloud/tags/) if any seem relevant. Feel free to make new ones if needed.
- Use H2 and H3 section headings like this: `## This is a H2` and `'### This is a H3`. They will appear as useful section headings on the right hand side when a user is in the blog.
- Anything between start of post and `<!--truncate-->` will appear as a preview on blog landing page.
- Use [code blocks](https://docusaurus.io/docs/markdown-features/code-blocks) and tell the code block what language to use so it looks as pretty as possible.
- If you have images you can upload them to your PR and just use the github url for them. Better would be to make a folder for your post and include images locally. See [this post](https://github.com/netdata/blog/tree/master/blog/2022-10-19-pandas-python) as an example.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Deployment is automated by Netlify. All PR's to `master` will trigger a deployment preview in Netlify which will be added to the PR.
