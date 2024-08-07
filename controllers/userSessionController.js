import UserSession from "../models/UserSession.js";

export const storeUserSession = async (user_id, user_role, token) => {
  console.log(
    "storeUserSession: " + user_id + " : " + user_role + " : " + token
  );

  const existingSession = await UserSession.findOne({
    user_id,
  });

  if (existingSession) {
    // Update the request_date of the existing session
    existingSession.auth_token = token;
    existingSession.request_date = new Date();
    await existingSession.save();
  } else {
    // Create a new session
    const session = new UserSession({
      user_id,
      user_role,
      auth_token: token,
      request_date: new Date(),
    });
    await session.save();
  }
};
