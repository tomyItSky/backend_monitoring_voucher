// services/logService.js
import UserActivityLogs from '../model/UserActivityLogs.js';

export const saveUserActivityLog = async (logData) => {
  try {
    await UserActivityLogs.create({
      UserId: logData.UserId,
      ActivityType: logData.ActivityType,
      CurrentUrl: logData.CurrentUrl,
      UTCActivityTime: logData.UTCActivityTime,
      RequestFromIP: logData.RequestFromIP,
      SessionData: logData.SessionData,
      ParamData: logData.ParamData,
      CreatedOn: logData.CreatedOn || new Date(),
    });
    console.log("User activity log saved successfully.");
  } catch (error) {
    console.error("Error saving user activity log:", error);
  }
};
