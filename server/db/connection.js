const mongoose = require('mongoose');

db = mongoose.connect('mongodb+srv://soum-ik:frontenddev@cluster0.dunrodk.mongodb.net/warsum?retryWrites=true&w=majority&appName=Cluster0').
  catch(error => handleError(error));
try {
  db = mongoose.connect('mongodb+srv://soum-ik:frontenddev@cluster0.dunrodk.mongodb.net/warsum?retryWrites=true&w=majority&appName=Cluster0');
} catch (error) {
  handleError(error);
}
