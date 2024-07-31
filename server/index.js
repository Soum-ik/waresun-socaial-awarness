const cors = require('cors');
const express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());





require('./db/connection');
const Users = require('./Models/User');
const Posts = require('./Models/Post');
const BusinessPromotion = require('./Models/business');
const User = require('./Models/User');


app.post('/login', async (req, res) => {
  const { email, password: IncommingPass } = req.body;
  console.log(req.body, 'body');
  const Exit = await Users.findOne({ email, disable: false });

  if (Exit) {
    const { password } = Exit;
    const hashPassChecking = bcrypt.compareSync(IncommingPass, password); // true
    // const hashPassChecking  = await bcrypt.compare(IncommingPass, password)
    console.log(typeof hashPassChecking); // Should log 'boolean'
    console.log(hashPassChecking); // Should log true or false

    if (!hashPassChecking) { // If hashPassChecking is false
      return res.json({ mess: "Password not matched", status: 400 });
    }

    const { name, _id } = Exit;
    const token = jwt.sign({ email, _id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ mess: "success", token: token, status: 200, data: name, user: Exit });
  } else {
    return res.json({ mess: "some wrong", status: 400 });
  }
});

app.post("/registration", async (req, res) => {
  const { email } = req.body;
  console.log(req.body, 'resgistan');
  const Exit = await Users.findOne({ email });
  if (Exit) {
    return res.status(400).json({ error: "User must be registered" });
  } else {
    let user = new Users(req.body);
    let result = await user.save();
    res.send(result);
  }
});


app.post('/create-post', async (req, res) => {
  const { token, name, title, des, image, startDate, endDate, goals
  } = req.body;

  try {
    // Verify JWT token
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(_id, 'token');
    // Create a new post



    const createPost = await Posts.create({
      userid: _id,
      image, des, title, name, endDate, startDate, goals

    });
    console.log('Post created:', createPost);

    // Respond with success message and created post data
    return res.json({ message: "Post created successfully", status: 200, data: createPost });
  } catch (error) {
    // Handle JWT verification errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token", status: 401 });
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation error", status: 400, error: error.message });
    } else {
      console.error('Error creating post:', error);
      return res.status(500).json({ message: "Server error", status: 500 });
    }
  }
});

app.get('/get-post', async (req, res) => {
  try {
    const posts = await Posts.find({ disable: false }).sort({ createdAt: -1 });
    return res.json({ message: "Post created successfully", status: 200, data: posts });

  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});



// personalaize post
app.get('/posts/:token', async (req, res) => {
  const { token } = req.params; // Extract token from URL parameters
  // // Verify JWT token
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const posts = await Posts.find({ userid: _id });
    return res.json({ message: "Get Post successfully", status: 200, data: posts });

  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});


// update post data
app.put('/update-post/:id', async (req, res) => {
  try {
    const { id } = req.params; // Corrected to use req.params
    const { title, des, image } = req.body;

    const updatePos = await Posts.findByIdAndUpdate(id, {
      $set: {
        title,
        des,
        image
      }
    }, { new: true }); // Added { new: true } to return the updated document

    if (!updatePos) {
      return res.status(404).json({ message: "Post not found", status: 404 });
    }

    return res.json({ message: "Post updated successfully", status: 200, data: updatePos });

  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});


// delete post data
app.delete('/delete-post/:id', async (req, res) => {
  try {
    const { id } = req.params; // Corrected to use req.params

    const deletePost = await Posts.findByIdAndDelete(id);// Added { new: true } to return the updated document
    console.log(deletePost, 'delete');


    return res.json({ message: "Post deleted successfully", status: 200, data: deletePost });

  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});

// update post data
// Update user data
app.put('/update-user/:token', async (req, res) => {
  try {
    const { token } = req.params; // Extract token from URL parameters
    const { _id } = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token

    const { name, email, profile, password } = req.body;

    // Prepare update data
    const updateData = { name, email, profile };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const updatedUser = await Users.findByIdAndUpdate(_id, { $set: updateData }, { new: true });

    return res.json({ message: "User updated successfully", status: 200, data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});

app.post('/create-business-promotion', async (req, res) => {
  const { token, name, description, owner, productsOrServices, logoOrProductImages } = req.body;

  try {
    // Verify JWT token
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(_id, 'token');

    // Create a new business promotion entry
    const createBusinessPromotion = await BusinessPromotion.create({
      userid: _id,
      name,
      description,
      owner,
      productsOrServices,
      logoOrProductImages,

    });

    console.log('Business promotion created:', createBusinessPromotion);

    // Respond with success message and created business promotion data
    return res.json({ message: "Business promotion created successfully", status: 200, data: createBusinessPromotion });
  } catch (error) {
    // Handle JWT verification errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token", status: 401 });
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation error", status: 400, error: error.message });
    } else {
      console.error('Error creating business promotion:', error);
      return res.status(500).json({ message: "Server error", status: 500 });
    }
  }
});

// personalaize business-promotion
app.get("/business-promotion/:token", async (req, res) => {
  const { token } = req.params; // Extract token from URL parameters
  // // Verify JWT token
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const posts = await BusinessPromotion.find({ userid: _id });
    return res.json({ message: "Get BusinessPromotion Post successfully", status: 200, data: posts });
  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});


// update business-promotion data
app.put('/update-business-promotion/:id', async (req, res) => {
  try {
    const { id } = req.params; // Corrected to use req.params
    const { description,
      logoOrProductImages,
      owner,
      productsOrServices,
      name } = req.body;

    const updatePos = await BusinessPromotion.findByIdAndUpdate(id, {
      $set: {
        description,
        logoOrProductImages,
        owner,
        productsOrServices,
        name
      }
    }, { new: true }); // Added { new: true } to return the updated document

    if (!updatePos) {
      return res.status(404).json({ message: "Post not found", status: 404 });
    }

    return res.json({ message: "Post updated successfully", status: 200, data: updatePos });

  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});


// delete business-promotion data
app.delete('/delete-business-promotion/:id', async (req, res) => {
  try {
    const { id } = req.params; // Corrected to use req.params

    const deletePost = await BusinessPromotion.findByIdAndDelete(id);// Added { new: true } to return the updated document
    console.log(deletePost, 'delete');


    return res.json({ message: "business-promotion deleted successfully", status: 200, data: deletePost });

  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});



app.get('/campains', async (req, res) => {
  try {
    const findCampains = await Posts.find({ disable: false });
    return res.json({ message: "campains  get successfully", status: 200, data: findCampains });
  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});
app.get('/business', async (req, res) => {
  try {
    const findCampains = await BusinessPromotion.find({ disable: false }).sort({ createdAt: -1 });
    return res.json({ message: "campains  get successfully", status: 200, data: findCampains });
  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});


// for admin view
app.get('/all-user', async (req, res) => {
  try {
    const findCampains = await User.find().sort({ createdAt: -1 });
    return res.json({ message: "User  get successfully", status: 200, data: findCampains });
  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});

app.put('/all-user-update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "user");

    // Fetch the current user to get the current disable state
    const currentUser = await User.findById(id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    // Toggle the disable state
    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: {
        disable: !currentUser.disable
      }
    }, { new: true }); // This option returns the updated document

    return res.json({ message: "User disabled successfully", status: 200, data: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});


app.get('/business-deshboard', async (req, res) => {
  try {
    const findCampains = await BusinessPromotion.find().sort({ createdAt: -1 });
    return res.json({ message: "campains  get successfully", status: 200, data: findCampains });
  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});

app.put('/business-deshboard-update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "user");

    // Fetch the current user to get the current disable state
    const currentUser = await BusinessPromotion.findById(id);

    if (!currentUser) {
      return res.status(404).json({ message: "BusinessPromotion post not found", status: 404 });
    }

    // Toggle the disable state
    const updatedUser = await BusinessPromotion.findByIdAndUpdate(id, {
      $set: {
        disable: !currentUser.disable
      }
    }, { new: true }); // This option returns the updated document

    return res.json({ message: "BusinessPromotion post disabled successfully", status: 200, data: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});

app.get('/campains-deshboard', async (req, res) => {
  try {
    const findCampains = await Posts.find();
    return res.json({ message: "campains  get successfully", status: 200, data: findCampains });
  } catch (error) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});

app.put('/campains-deshboard-update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "user");

    // Fetch the current user to get the current disable state
    const currentUser = await Posts.findById(id);

    if (!currentUser) {
      return res.status(404).json({ message: "Campains post not found", status: 404 });
    }

    // Toggle the disable state
    const updatedUser = await Posts.findByIdAndUpdate(id, {
      $set: {
        disable: !currentUser.disable
      }
    }, { new: true }); // This option returns the updated document

    return res.json({ message: "Campains post disabled successfully", status: 200, data: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", status: 500 });
  }
});



app.listen((process.env.PORT || 4000), function () {
  console.log(`🛢 Database has been connected successfully`);
});