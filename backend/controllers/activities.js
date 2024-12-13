import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect.js';

// Get all activities
export async function getAllActivities(req, res) {
  // console.log('getAllActivities is called');
  try {
    // console.log('getAllActivities try section is called');
    let db = await getDb();
    let result = await db
      .db('inlandnwsingles')
      .collection('activities')
      .find({})
      .toArray();
    // console.log(result);
    if (result.length > 0) {
      // console.log(result);
      res.json(result);
    } else {
      throw new Error('Data was not found.');
    }
  } catch (err) {
    // console.log('getAllActivities catch section is called');
    res.status(500).json({ message: err.message });
  }
}

// Get an activity by ID
export async function getSingleActivity(req, res) {
  console.log('getSingleActivity has been called');
  try {
    // req.params.id will grab the requested id for the json file
    const userId = new ObjectId(req.params.id);
    console.log(`userId = ${userId}`);
    // .find({_id: userId}) finds the user id that was entered above
    let db = await getDb();
    // console.log(db);
    let result = await db
      .db('inlandnwsingles')
      .collection('activities')
      .findOne({ _id: userId });
    // console.log(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Post/Create a new activity
export async function createActivity(req, res) {
  try {
    const activity = {
      title: req.body.title,
      dateCreated: req.body.dateCreated,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      description: req.body.description,
      children: req.body.children,
      location: {
        name: req.body.name,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
      },
      creator: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        stake: req.body.email,
      },
    };
    const result = await getDb()
      .db('inlandnwsingles')
      .collection('activities')
      .insertOne(activity);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res
        .status(500)
        .json(
          result.error || 'Some error occurred while creating the activity.',
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Put/Update an activity
export async function updateActivity(req, res) {
  try {
    // req.params.id will grab the requested id for the json file
    const userId = new ObjectId(req.params.id);
    const activity = {
      title: req.body.title,
      dateCreated: req.body.dateCreated,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      description: req.body.description,
      children: req.body.children,
      location: {
        name: req.body.name,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
      },
      creator: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        stake: req.body.email,
      },
    };
    // .updateOne({_id: userId}) deletes the user id that was entered above
    const result = await getDb()
      .db()
      .collection('activities')
      .replaceOne({ _id: userId }, activity);
    console.log(result);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          result.error || 'Some error occurred while updating the activity.',
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete an activity
export async function deleteActivity(req, res) {
  try {
    // req.params.id will grab the requested id for the json file
    const userId = new ObjectId(req.params.id);
    // .deleteOne({_id: userId}) deletes the user id that was entered above
    const result = await getDb()
      .db()
      .collection('activities')
      .deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
      res.status(200).json(result);
    } else {
      res.status(500).json(
        result.error || {
          message: 'Some error occurred while deleting the activity.',
        },
      );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
