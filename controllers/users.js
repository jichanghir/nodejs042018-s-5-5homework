const Users = require('../db/models/users');

exports.saveNewUser = ({username, surName, firstName, middleName, password, image, permissionId, permission}) => new Promise(async (resolve, reject) => {
    try {
        if (!username || !password) {
            resolve({
                success: false,
                message: 'username & password required'
            });
            return;
        }

        let existedUser = await Users.find({username: username});

        if (existedUser) {
            resolve({
                success: false,
                message: 'username already existed'
            });
            return;
        }

        let mockPerrmisions =  {
            chat: {
                C: true,
                D: true,
                R: true,
                U: true,
            },
            news: {
                C: true,
                D: true,
                R: true,
                U: true,
            },
            setting: {
                C: true,
                D: true,
                R: true,
                U: true,
            }
        }

        let newUser = new Users({
            username,
            surName,
            firstName,
            middleName,
            password,
            image,
            permissionId,
            permission: mockPerrmisions
        });

        let result = await newUser.save();

        let responseResult = {
            access_token: result.access_token || '',
            id: result._id
        }

        resolve(responseResult);
    }
    catch(err) {
        reject(err);
    }
})
