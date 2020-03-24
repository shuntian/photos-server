const mongoose = require('mongoose');


// 链接数据库
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/photos', {useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;
conn.on('err', () => {
  console.log('db connected error!');
})
conn.once('open', () => {
  console.log('db connect success!')
});


// 创建数据库表
const userSechema = new mongoose.Schema({
  openId: {type: String, index: true, unique: true},
  name: {type: String, index: true},
  avatar: {type: String},
  userType: {type: Number},
  created: {type: Date, default: Date.now},
  lastLogin: {type: Date}
});

const photoSchema = new mongoose.Schema({
  userId: {type: String},
  url: {type: String},
  isApproved: {type: Boolean, default: null, index: true},
  albumId: {type: mongoose.Schema.Types.ObjectId},
  created: {type: Date, default: Date.now},
  isDelete: {type: Boolean, default: false}
});

const albumSchema = new mongoose.Schema({
  userId: {type: String},
  name: {type: String}
}, {
  versionKey: false,
  timestamps: {createdAt: 'created', updatedAt: 'updated'}
})

// 生成数据库表实例
const UserModel = mongoose.model('user', userSechema);
const PhotoModel = mongoose.model('photo', photoSchema);
const AlbumModel = mongoose.model('album', albumSchema);

exports.UserModel = UserModel;
exports.AlbumModel = AlbumModel;
exports.PhotoModel = PhotoModel;