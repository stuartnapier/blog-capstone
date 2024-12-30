import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// data store
let blogs = [];

// constructor function
function CreatePost (title, content, date) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

function addPost(title, content){
    console.log("Title:", title); // Debugging statement
    console.log("Content:", content); // Debugging statement
    let post = new CreatePost(title, content);
    blogs.unshift(post); 
}

function editPost(title, content, index){
    let post = new CreatePost(title, content);
    blogs[index] = post;
};

// Delete post function
function deletePost(index){
    blogs.splice(index, 1);
}

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


// Homepage
app.get("/", (req, res) => {
    res.render("index.ejs", {blogs: blogs});
});


// View an existing post
app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = blogs[index];
    res.render("view.ejs", {postId: index, title: post.title, body: post.content, date: post.date});
});

// Create new post
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// Edit existing post page
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = blogs[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});


// Save new post
app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});

// Update an existing post
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(title, content, index);
    res.redirect("/view/" + index);
});


// Delete a post
app.post("/delete", (req, res) => {
    let index = req.body["index"];
    deletePost(index);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    addPost("Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit", " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id efficitur quam, ut ullamcorper eros. Nunc efficitur posuere augue eget tempus. Donec ac turpis quis tellus accumsan sodales eu maximus nulla. Pellentesque urna elit, pulvinar commodo imperdiet ut, dictum quis eros. Maecenas vel massa urna. Proin eu enim fermentum quam condimentum mattis id at mauris. Fusce at eleifend nulla, tincidunt tristique quam. Curabitur convallis est nec eros tincidunt, a finibus eros molestie. Nulla purus nisl, porta cursus diam ut, eleifend aliquet felis. Etiam finibus at magna sit amet ullamcorper. Quisque id consequat ex, non hendrerit ante. Suspendisse egestas, turpis eget imperdiet porttitor, mi lorem molestie felis, in volutpat ligula erat sed metus. Proin augue diam, porttitor lobortis varius ut, sagittis vel eros. Vivamus placerat nunc vitae luctus cursus. Etiam vestibulum magna at nulla vulputate, non sollicitudin massa aliquet. Suspendisse sodales eros vitae ipsum aliquet viverra. Nam venenatis tortor sit amet imperdiet vehicula. Nullam laoreet pulvinar tempus. Ut in ultrices metus. Integer vitae ipsum nibh. Sed quam metus, pulvinar a sollicitudin at, efficitur nec nisi. In erat ligula, ullamcorper ac maximus id, hendrerit ac mauris. Pellentesque condimentum varius semper. Integer eget bibendum lorem, eget dictum neque. Pellentesque accumsan malesuada lectus et porta. Cras maximus sollicitudin cursus. Phasellus sodales eleifend ligula, vitae dapibus mi dapibus nec. Suspendisse nunc sem, semper tristique dui ac, fermentum sollicitudin lorem. Nullam luctus auctor congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra velit eget nibh congue, eget feugiat tortor pulvinar. Integer suscipit non odio a fringilla. Maecenas vulputate nibh erat, lobortis feugiat magna ullamcorper vitae. Fusce sit amet vulputate nisl. Nunc bibendum mattis velit. Donec sodales libero id risus porttitor dignissim. Aliquam nisl nisi, commodo ac nisi eu, dignissim luctus orci. Proin imperdiet aliquet lobortis. Praesent ut pulvinar quam. Quisque suscipit tortor sit amet magna lacinia, et hendrerit ligula faucibus. Morbi justo mauris, pretium vitae risus vel, mollis semper risus. ");
    addPost("First Title", "This is the content of the first post");
    addPost("Second Title", "Second content of the second post");
});