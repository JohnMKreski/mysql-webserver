const bcrypt = require('bcryptjs');

const connection = require('../db-config');
const query = require('../utils/query');
const {
  GET_ME_BY_USER_ID,
  GET_ME_BY_USERNAME,
  GET_ME_BY_USERNAME_CHECK,
  GET_ME_BY_USER_ID_WITH_PASSWORD,
  GET_ME_BY_USER_ID_WITH_PASSWORD_CHECK,
  UPDATE_USER_INFO,
  UPDATE_USER_PASSWORD,
} = require('../queries/user.queries');
const escape = require('../utils/escape');


exports.getMe = async (req, res) => {
  // verify valid token
  const user = req.user; // set upin middleware {id: 1, role_type: 'x', iat: wlenfwekl, expiredIn: 9174323 }
  // console.log(user);
  // take result of middleware check
  //decoded.id or !!decoded
  if (user.id) {
    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });


    //TODO: Im passing roleType but spelling it wrong
    const existingUser = await query(con, GET_ME_BY_USER_ID(user.id)).catch(
      (err) => {
        res.status(500).json({ msg: 'Could not find the user.' });
      }
    );

    // console.log(existingUser);

    if (existingUser.length) {
      res.status(200).send(existingUser);
    } else {
      res.status(400).json({ msg: 'No user found.' });
    }
  }
};


const verifyPassword = async function (req) {
  try {
    const userId = req.user.id;
    const password = req.body.password;

    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // Retrieve the existing password hash from the database based on the userId
    const [user] = await query(con, GET_ME_BY_USER_ID_WITH_PASSWORD(userId)).catch((err) => {
      console.error(err);
      console.log('Sending response with status 500 and a message: Could not retrieve user.');
      throw new Error('Could not retrieve user.');
    });

    if (!user) {
      console.log('Sending response with status 404 and a message: User not found');
      throw new Error('User not found');
    }

    // Compare the provided password with the stored password hash
    const isMatch = await bcrypt.compare(password, user.password);

    return isMatch;

  } catch (error) {
    // Handle errors
    console.error(error);
    console.log('Sending response with status 500 and message: An error occurred while verifying the password.');
    throw new Error('An error occurred while verifying the password.');
  }
};

const verifyUpdatePassword = async function (req) {
  try {
    const userId = req.user.id;
    const currentPassword = req.body.currentPassword;

    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // Retrieve the existing password hash from the database based on the userId
    const [user] = await query(con, GET_ME_BY_USER_ID_WITH_PASSWORD(userId)).catch((err) => {
      console.error(err);
      console.log('Sending response with status 500 and a message: Could not retrieve user.');
      throw new Error('Could not retrieve user.');
    });

    if (!user) {
      console.log('Sending response with status 404 and a message: User not found');
      throw new Error('User not found');
    }

    // Compare the provided password with the stored password hash
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    return isMatch;

  } catch (error) {
    // Handle errors
    console.error(error);
    console.log('Sending response with status 500 and message: An error occurred while verifying the password.');
    throw new Error('An error occurred while verifying the password.');
  }
};


exports.updateMe = async function (req, res) {
    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // check for existing user first
    const [existingUser] = await query(
      con,
      GET_ME_BY_USER_ID(req.user.id)
    ).catch((err) => {
      console.log(err);
      console.log('Sending response with status 500 and message: Could not retrieve user.');
      return res.status(500).json({ msg: 'Could not retrieve user.' });
    });

    console.log("Existing User:", existingUser);

    if (!existingUser) {
      console.log('Sending response with status 404 and message: User not found.');
      return res.status(404).json({ msg: 'User not found.' });
    }

    // verify the current password 
    const isPasswordValid = await verifyPassword(req);
    if (!isPasswordValid) {
      console.log('Sending response with status 401 and message: Invalid current password.');
      return res.status(401).json({ msg: 'Invalid current password.' });
    } else {
      console.log('Password Verified');
    }

    const {
      username: existingUsername,
      email: existingEmail,
    } = existingUser;

    const { username, email } = req.body;

    // Check if the new username already exists
    const [userWithNewUsername] = await query(
      con,
      GET_ME_BY_USERNAME_CHECK(username)
    ).catch((err) => {
      console.log(err);
      console.log('Sending response with status 500 and message: Could not retrieve user.');
      return res.status(500).json({ msg: 'Could not retrieve user.' });
    });

    console.log("User with new username:", userWithNewUsername);

    if (userWithNewUsername) {
      // If a user with the new username exists
      if (userWithNewUsername.user_id !== req.user.id) {
        console.log('Sending response with status 400 and message: Username already exists. Please choose another.');
        return res.status(400).json({ msg: 'Username already exists. Please choose another.' });
      } else {
        // Proceed with the update process since the new username belongs to the current user
        console.log("Username belongs to the current user. Proceeding with the update.");
      }
    } else {
      // If a user with the new username doesn't exist
      // Proceed with the update process
      console.log("Username is available. Proceeding with the update.");
    }

    console.log("Request Body:", req.body);

    // checked for password changed
    // SAME LOGIC AS CHECKING FOR A VALID PASSWORD (same function)
    //BUTT checking if password is unchanged
    // const isPasswordSame = await bcrypt
    //   .compare(password, existingPassword)
    //   .catch((err) => {
    //     console.log(err);
    //     res.json(500).json({ msg: 'Invalid password!' });
    //   });

    // console.log("Is Password Same:", isPasswordSame);

    const newUser = username || existingUsername; // use same username if unchanged
    const newEmail = email || existingEmail; // use same email is unchaged
    // const newPassword = !isPasswordSame // use same password if unchanged
    //   ? bcrypt.hashSync(password)
    //   : existingPassword;

    console.log("New User:", newUser);
    console.log("New Email:", newEmail);
    // console.log("New Password:", newPassword);

    const {
      newUser: escapedUsername,
      newEmail: escapedEmail,
      // newPassword: escapedPassword,
    } = escape({
      newUser,
      newEmail,
      // newPassword,
    });

    // perform update
    const result = await query(
      con,
      UPDATE_USER_INFO(escapedUsername, escapedEmail, req.user.id)
    ).catch((err) => {
      console.log(err);
      console.log('Sending response with status 500 and message: Could not update user settings.');
      return res.status(500).json({ msg: 'Could not update user settings.' });
    });

    console.log("Update Result:", result);

    if (result.affectedRows === 1) {
      console.log('Sending response with status 200 and message: User Information updated successfully!');
      return res.json({ msg: 'User Information Updated succesfully!' });
    } else if (result.affectedRows === 0) {
      console.log('Sending response with status 200 and message: Nothing to update...');
      return res.status(200).json({ msg: 'Nothing to update...' });
    } else {
      // Handle unexpected result
      console.log('Sending response with status 500 and message: Unexpected result from database.');
      return res.status(500).json({ msg: 'Unexpected result from database.' });
    }
};

exports.updatePassword = async function (req, res) {
  try {
      // establish a connection
      const con = await connection().catch((err) => {
        throw err;
      });

      const [existingUserPassword] = await query(
        con,
        GET_ME_BY_USER_ID_WITH_PASSWORD(req.user.id)
      ).catch((err) => {
        console.log(err);
        console.log('Sending response with status 500 and message: Could not retrieve user.');
        return res.status(500).json({ msg: 'Could not retrieve user.' });
      });

      // verify the current password before proceeding
      const isPasswordValid = await verifyUpdatePassword(req);
      if (!isPasswordValid) {
        console.log('Sending response with status 401 and message: Invalid current password.');
        return res.status(401).json({ msg: 'Invalid current password.' });
      } else {
        console.log('Password Verified');
      }

      const {
        // username: existingUsername,
        // email: existingEmail,
        password: existingPassword,
      } = existingUserPassword;
  
      const { newPassword } = req.body;

      // if (!existingPassword || typeof existingPassword !== 'string' || existingPassword.trim() === '') {
      //   console.log('Sending response with status 500 and message: Existing password not found.');
      //   return res.status(500).json({ msg: 'Existing password not found.' });
      // }

      console.log("New Password:", newPassword);
      console.log("Existing Password:", existingPassword);

      // checked for password changed
      // SAME LOGIC AS CHECKING FOR A VALID PASSWORD (same function)
      //BUTT checking if password is unchanged
      const isPasswordSame = await bcrypt
      .compare(newPassword, existingPassword)
      .catch((err) => {
        console.log(err);
        console.log('Sending response with status 500 and message: Invalid password!');
        return res.json(500).json({ msg: 'Invalid password!' });
      });

      console.log("Is Password Same:", isPasswordSame);

      // const newUser = username || existingUsername; // use same username if unchanged
      // const newEmail = email || existingEmail; // use same email is unchaged
      const newPasswordCheck = !isPasswordSame // use same password if unchanged
        ? bcrypt.hashSync(newPassword)
        : existingPassword;

      // console.log("New User:", newUser);
      // console.log("New Email:", newEmail);
      console.log("New Password:", newPasswordCheck);

      const {
        // newUser: escapedUsername,
        // newEmail: escapedEmail,
        newPasswordCheck: escapedPassword,
      } = escape({
        // newUser,
        // newEmail,
        newPasswordCheck,
      });

      const result = await query(
        con,
        UPDATE_USER_PASSWORD(escapedPassword, req.user.id)
      ).catch((err) => {
        console.log(err);
        console.log('Sending response with status 500 and message: Could not update user password.');
        return res.status(500).json({ msg: 'Could not update user password.' });
      });

      if (result.affectedRows === 1) {
        console.log('Sending response with status 200 and message: User Password updated succesfully!');
        return res.json({ msg: 'User Password updated succesfully!' });
      } else {
        console.log('Sending response with status 200 and message: Nothing to update...');
        return res.json({ msg: 'Nothing to update...' });
      } 
  } catch (err) {
      console.error("Error:", err);
      console.log('Sending response with status 500 and message: An error occurred while updating the password.');
      return res.status(500).json({ msg: 'An error occurred while updating the password.' });
  }
};
