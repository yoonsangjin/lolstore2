function admin_confirm(req, res, next) {
  try {
    if (req.currentUserRole == 'admin-user') {
      next();
    } else {
      throw new Error('관리자가 아닙니다');
    }
  } catch (err) {
    next(err);
  }
}

export { admin_confirm };
