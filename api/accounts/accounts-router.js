const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");
const Account = require("./accounts-model");

const router = require("express").Router();

// /api/accounts
router.get("/", (req, res, next) => {
  Account.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", checkAccountId, (req, res, next) => {
  res.status(200).json(req.account);
});

router.post("/", checkAccountPayload, async (req, res, next) => {
  try {
    const created = await Account.create({
      name: req.body.name.trim(),
      budget: req.body.budget,
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountId,
  async (req, res, next) => {
    try {
      const updatedAccount = await Account.updateById(req.params.id, req.body);
      res.status(200).json(updatedAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    const deleteThis = await Account.deleteById(req.params.id);
    res.status(200).json(deleteThis);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
