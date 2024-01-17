if (req.body.search.$text && onlyAlphabetReg.test(req.body.search.$text.$search)) {
    const dynamicFieldValue = req.body.search.$text.$search

    const schema = InventoryModel.schema;
    const fieldsToSearch = Object.keys(schema.paths).filter(
      (path) => schema.paths[path].instance === 'String'
    );
    const orConditions = fieldsToSearch.map((field) => ({
      [field]: { $regex: dynamicFieldValue, $options: "i" }
    }));
    const searchQuery = {
      $or: orConditions
    };






    
    const combinedQuery = {
      $and: [searchQuery, { organization: idfromAuthMiddleware }]
    };
    InventoryModel.paginate(combinedQuery, options, function (err, doc) {

      // console.log("doc----->", doc)


      if (doc?.docs !== null && doc?.docs?.length == 0) {
        handleResponse(200, "Fetched Inventory", doc)
      }
      else {
        return res.status(201).send({
          status: 201,
          success: false,
          data: doc,
          message: "Couldn't found"
        });

      }
    })
  }





