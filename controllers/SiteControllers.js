const message = require("../utils/message");
const { getListAddress } = require("../utils/address");
var Status = require("../models/status_model");
var Tour = require("../models/tour_model");
const connection = require("../utils/connection");

class SiteControllers {
  index(req, res) {
    return res.send(message({ data: "Hello world" }));
  }
  async listAddress(req, res) {
    return res.send(message(await getListAddress()));
  }

  // [GET] /status/list-status?type={value}
  listStatus(req, res, next) {
    var query = require("url").parse(req.url, true).query;
    var type = query.type;
    Status.getFollowType(type, function (result) {
      console.log("result: ", result);
      res.send(message(result, true, "Thành công!"));
    });
  }
  async getOwnInfor(req, res) {
    let { email } = req.body;
    try {
      let rows, fields;
      if (req.body.role == "customer")
        [rows, fields] = await connection.execute(
          "call railway.sp_get_customer_by_email(?);",
          [email]
        );
      else
        [rows, fields] = await connection.execute(
          "call railway.sp_get_staff_by_email(?);",
          [email]
        );

      return res.send(message(rows[0], true, ""));
    } catch (error) {
      return res.send(message("", false, error.message));
    }
  }
  // [GET] /site/number-staff
  async getNumberStaff(req, res) {
    try {
      let rows, fields;
      if (req.body.role == "admin") {
        [rows, fields] = await connection.execute(
          "SELECT * FROM railway.v_staff_number;"
        );
        return res.send(message(rows[0], true, "Thành công!"));
      } else return res.send(message([], false, "Không có quyền truy cập!"));
    } catch (error) {
      return res.send(message("", false, error.message));
    }
  }

  // [GET] /site/number-tour
  numberTour(req, res) {
    const query = require("url").parse(req.url, true).query;
    const type = query.type;
    const status = query.status ? query.status : 0;
    if (type == "featured") {
      Tour.getNumberTourFeatured()
        .then((result) => {
          res.send(message(result, true, "Thành công!"));
        })
        .catch((err) => {
          res.send(message(err, false, "Thất bại!"));
        });
    } else {
      Tour.getNumberTour(status)
        .then((result) => {
          res.send(message(result, true, "Thành công!"));
        })
        .catch((err) => {
          res.send(message(err, false, "Thất bại!"));
        });
    }
  }

  async statistic(req, res, next) {
        const year = req.query.year;
        const type = req.query.type;
        try {
            let result = [],
                feild = [];
            if (type == 'revenue')
                [result, feild] = (await connection.query('call managetour.sp_statistic_revenue(?);', year))[0];
            else if (type == 'person')
                [result, feild] = (await connection.query('call managetour.sp_statistic_person(?);', year))[0];
            else if (type == 'destination')
                [result, feild] = (await connection.query('call managetour.sp_statistic_destination(?);', year))[0];
            res.send(message(result));
        } catch (error) {
            res.send(message([], false, error.message));
        }
    }
}

module.exports = new SiteControllers();
