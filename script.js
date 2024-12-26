async function cache(key, callable) {
    const value = window.localStorage.getItem(key);
    if (value !== null) {
        return value;
    }
    window.localStorage.setItem(key, await callable());
    return window.localStorage.getItem(key);
}


function getCurrentPost(feed){
    const path = new URL(window.location.href).pathname
    const matches = path.match(new RegExp("post/([^/]*)"));
    if (matches) {
      return feed.find(v => v.post.cid === matches[1]).post || undefined;
    }

    for (const {post} of feed) {
        if (isValidPost(post)) {
            return post
        }
    }
    return undefined;
}

function isValidPost(post) {
    // We don't want the representations of text, nor do we want to include reposts of unrelated things!
    return post.record.text.indexOf("#") === -1 && post.author.did === actor && post.record.embed.images.length > 0;
}

function buildSidebar(feed, currentPost) {
    let sidebar = "";
    for (const {post} of feed) {
      if (!isValidPost(post)) {
        continue;
      }
      // console.log("From Path", path, postCid, "In Post", post.cid);
      sidebar += `<a href="/post/${post.cid}" class="list-group-item ${post.cid === currentPost.cid ? 'active' : ''}">
          <span class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">${post.record.text}</strong>
          <span>
          <span class="small">${post.indexedAt.split("T")[0]}</span>
      </a>`;
    }
    return sidebar;
}
// ((💛💙)*[💛✨|💕])+
// ((?>^|💚)(💛💙)*(💕|💛✨))+
function buildCard(post) {
    const image = post.embed.images[0];
    document.querySelector(".main-header").innerHTML = post.record.text;
    document.querySelector(".main-image").src = image.fullsize;
    document.querySelector(".main-image").alt = image.alt;
    document.querySelector(".main-link").href = `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split("/").pop()}`
}


function load(postId){
  let state = window.localStorage.getItem("post:"+postId);
  if (state) {
    state = JSON.parse(state);
  } else {
    state = {regex: "", valid: "", invalid: ""}
  }

  regexInput.value = state.regex;
  validInput.value = state.valid;
  invalidInput.value = state.invalid;
}
  
function save(postId) {
    const state = JSON.stringify({
        regex: regexInput.value,
        valid: validInput.value,
        invalid: invalidInput.value
    })

  window.localStorage.setItem("post:"+postId, state)

  // this gets a bit weird if I just use hashes like this - if someone links to a hashed version of the page, all the current page state will be lost
//   window.location.hash = window.btoa(state);
}