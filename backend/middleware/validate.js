import validator from './validator.js';
import { ObjectId } from 'mongodb';

export function saveActivity(req, res, next) {
  const validationRule = {
    // "required" makes the field required. Just leave off if field is optional
    hikeName: 'required|string',
    location: 'required|string',
    type: 'required|string',
    miles: 'required|numeric',
    elevationStart: 'integer',
    elevationEnd: 'integer',
    elevationGain: 'required|integer',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
}

// const saveFish = (req, res, next) => {
//   const validationRule = {
//     type: 'required|string',
//     length: 'required|numeric',
//     weight: 'required|integer',
//     date: 'required|string',
//     location: 'required|string'
//   };
//   validator(req.body, validationRule, {}, (err, status) => {
//     if (!status) {
//       res.status(412).send({
//         success: false,
//         message: 'Validation failed',
//         data: err
//       });
//     } else {
//       next();
//     }
//   });
// };

export function checkId(req, res, next) {
  // checks to see if the id entered is a valid Mongodb ID
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid ID.' });
    process.exit;
  } else {
    next();
  }
}

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// export default {
//   saveHike,
//   saveFish,
//   checkId
// };
