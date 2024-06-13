exports.todo = {
    created: "Todo Created",
    deleted: "Todo Deleted",
    updated: "Todo Updated"
  };
  
  exports.error = {
    missing: (...fields) => `Required missing fields ${fields.join(" or ")}`,
    user: "User id is required", // sort of auth error
  };
  
  exports.generic = {
    success: "Success",
    invalid: "Invalid Request",
    not_found: "Resource not found",
    not_permitted: "Permission Denied",
    possible_duplicate: "Possible Duplicate",
  };
  
  exports.auth = {
    no_header: "Authorization header required",
    no_token: "Please pass user id in authorization header",
  };
  