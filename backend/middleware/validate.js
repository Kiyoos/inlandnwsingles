import validator from './validator.js';
import { ObjectId } from 'mongodb';

export function saveActivity(req, res, next) {
  const validationRule = {
    // "required" makes the field required. Just leave off if field is optional
    title: 'required|string',
    dateCreated: 'required|date',
    startTime: 'required|date',
    endTime: 'date',
    description: 'string',
    children: 'boolean',
    location: {
      name: 'required|string',
      street: 'required|string',
      city: 'required|string',
      state: 'required|string',
      zip: 'required|int32',
    },
    creator: {
      name: 'string',
      phone: 'string',
      email: 'string',
      stake: 'string',
    },
    image: {
      src: 'string',
      alt: 'string',
    },
    category: 'string',
    favorite: 'boolean',
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
