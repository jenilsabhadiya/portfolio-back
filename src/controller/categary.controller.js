// const Category = require("../model/categories.model");
// const fs = require("fs");
// const { updateCloudinary, deleteCloudinary } = require("../utlis/cloud");
// const sentMail = require("../utlis/nodemailer");

// const ListCategary = async (req, res) => {
//   console.log("List Category");

//   try {
//     const categories = await Category.find(req.body);

//     if (!categories) {
//       res.status(404).json({
//         success: false,
//         data: [],
//         message: "Category not list Added",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: categories,
//       message: "Category list Added",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: [],
//       message: "Category data not working." + error.message,
//     });
//   }
// };

// const GetCategary = async (req, res) => {
//   console.log("Get Category");
//   try {
//     const category = await Category.findById(req.params.id);

//     if (!category) {
//       res.status(404).json({
//         success: false,
//         data: {},
//         message: "Category not Get.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: category,
//       message: "Category Get",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "Category Get data not working." + error.message,
//     });
//   }
// };

// const AddCategary = async (req, res) => {
//   console.log("wwwwww", req.body, req.file);

//   try {
//     const cData = await updateCloudinary(req.file.path, "category");
//     console.log("cdata", cData);

//     // const categary = await Category.create({
//     //   ...req.body,
//     //   category_image: req.file.path,
//     // });
//     // console.log(categary);

//     //? Cloud useing data.
//     const categary = await Category.create({
//       ...req.body,
//       category_image: {
//         public_id: cData.public_id,
//         url: cData.url,
//       },
//     });
//     console.log(categary);

//     if (!categary) {
//       res.status(400).json({
//         success: false,
//         data: {},
//         message: "Category not created",
//       });
//     }

//     // try {
//     //   await sentMail(
//     //     "sabhadiyajenil61@gmail.com",
//     //     "Category done",
//     //     "Category created successfully"
//     //   );
//     // } catch (error) {
//     //   res.status(500).json({
//     //     success: false,
//     //     data: {},
//     //     message: "Category created but error in send email." + error.message,
//     //   });
//     // }

//     res.status(201).json({
//       success: true,
//       data: categary,
//       message: "Category created successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "Category data not working." + error.message,
//     });
//   }

//   console.log("Done!");
// };

// const UpdataCategary = async (req, res) => {
//   console.log("Updata Category", req.params.id, req.body, req.file);

//   const updataData = { ...req.body };
//   const categoryData = await Category.findById(req.params.id);
//   console.log(categoryData);

//   if (req.file) {
//     try {
//       // fs.unlinkSync(categoryData.category_image);
//       deleteCloudinary(categoryData.category_image.public_id);
//       const cData = await updateCloudinary(req.file.path, "category");
//       updataData.category_image = {
//         public_id: cData.public_id,
//         url: cData.url,
//       };
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         data: {},
//         message: "Category image not Delete.",
//       });
//     }
//   }

//   console.log(updataData);

//   try {
//     const category = await Category.findByIdAndUpdate(
//       req.params.id,
//       updataData,
//       {
//         new: true,
//         upsert: true,
//         runValidators: true,
//       }
//     );

//     if (!category) {
//       res.status(404).json({
//         success: false,
//         data: {},
//         message: "Category not Updata.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: category,
//       message: "Category Updata",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "Category Updata data not working." + error.message,
//     });
//   }
// };

// const DeleteCategary = async (req, res) => {
//   console.log("Delete Category");

//   try {
//     const categoryData = await Category.findById(req.params.id);
//     console.log(categoryData);

//     deleteCloudinary(categoryData.category_image.public_id);

//     // fs.unlink(categoryData.category_image, (error) => {
//     //   if (error) {
//     //     return res.status(400).json({
//     //       success: false,
//     //       data: {},
//     //       message: "Category image not Delete.",
//     //     });
//     //   }
//     // });

//     const category = await Category.findByIdAndDelete(req.params.id);

//     if (!category) {
//       res.status(404).json({
//         success: false,
//         data: {},
//         message: "Category not Delete.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: category,
//       message: "Category Delete",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "Category Delete data not working." + error.message,
//     });
//   }
// };

// const countActiveCategories = async (req, res) => {
//   console.log("countActiveCategories");

//   try {
//     const category = await Category.aggregate([
//       {
//         $match: {
//           action: true,
//         },
//       },
//       {
//         $count: "action",
//       },
//     ]);

//     console.log("countActiveCategories", category);

//     if (!category) {
//       res.status(404).json({
//         success: false,
//         data: {},
//         message: "countActiveCategories not Get.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: category,
//       message: "countActiveCategories Get",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "countActiveCategories Get data not working." + error.message,
//     });
//   }
// };

// const mostProductsCategories = async (req, res) => {
//   console.log("mostProductsCategories");

//   try {
//     const category = await Category.aggregate([
//       {
//         $lookup: {
//           from: "product",
//           localField: "_id",
//           foreignField: "category_id",
//           as: "mostProducts",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           mostProducts: { $size: "$mostProducts" },
//         },
//       },
//       {
//         $sort: {
//           mostProducts: -1,
//         },
//       },
//       {
//         $limit: 1,
//       },
//     ]);

//     console.log("mostProductsCategories", category);

//     if (!category) {
//       res.status(404).json({
//         success: false,
//         data: {},
//         message: "mostProductsCategories not Get.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: category,
//       message: "mostProductsCategories Get",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "mostProductsCategories Get data not working." + error.message,
//     });
//   }
// };

// const averageProductsCategories = async (req, res) => {
//   console.log("averageProductsCategories");

//   try {
//     const category = await Category.aggregate([
//       {
//         $lookup: {
//           from: "products",
//           localField: "_id",
//           foreignField: "Categary_id",
//           as: "averageProducts",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           averageProducts: { $size: "$averageProducts" },
//         },
//       },
//       {
//         $group: {
//           _id: "$_id",
//           avgProducts: { $avg: "$averageProducts" },
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           avgProducts: 1,
//         },
//       },
//       {
//         $sort: {
//           avgProducts: -1,
//         },
//       },
//     ]);

//     console.log("averageProductsCategories", category);

//     if (!category) {
//       res.status(404).json({
//         success: false,
//         data: {},
//         message: "average Products Categories not Get.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: category,
//       message: "average Products Categories Get",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message:
//         "average Products Categories Get data not working." + error.message,
//     });
//   }
// };

// const inActiveCategories = async (req, res) => {
//   console.log("inActiveCategories");

//   try {
//     const category = await Category.aggregate([
//       {
//         $match: {
//           action: false,
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           action: 1,
//         },
//       },
//     ]);

//     console.log("inActiveCategories", category);

//     if (!category) {
//       res.status(404).json({
//         success: false,
//         data: {},
//         message: "inActive Categories not Get.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: category,
//       message: "inActive Categories Get",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "inActive Categories Get data not working." + error.message,
//     });
//   }
// };

// const countSubcategories = async (req, res) => {
//   console.log("countSubcategories");

//   try {
//     const category = await Category.aggregate([
//       {
//         $lookup: {
//           from: "subcategaries",
//           localField: "_id",
//           foreignField: "Category_id",
//           as: "subCategories",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           subCategories: { $size: "$subCategories" },
//         },
//       },
//     ]);

//     console.log("countSubcategories", category);

//     if (!category) {
//       res.status(404).json({
//         success: false,
//         data: {},
//         message: "count Subcategories not Get.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: category,
//       message: "count Subcategories Get",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "count Subcategories Get data not working." + error.message,
//     });
//   }
// };

// const withSubcategoriesProductsCount = async (req, res) => {
//   console.log("withSubcategoriesProductsCount");

//   try {
//     const category = await Category.aggregate([
//       {
//         $lookup: {
//           from: "subcategaries",
//           localField: "_id",
//           foreignField: "Category_id",
//           as: "subCategories",
//         },
//       },
//       {
//         $lookup: {
//           from: "products",
//           localField: "_id",
//           foreignField: "Categary_id",
//           as: "products",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           category_name: 1,
//           subCategories: { $size: "$subCategories" },
//           products: { $size: "$products" },
//         },
//       },
//     ]);

//     console.log("withSubcategoriesProductsCount", category);

//     if (!category) {
//       res.status(404).json({
//         success: false,
//         data: {},
//         message: "with Subcategories Products Count not Get.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: category,
//       message: "with Subcategories Products Count Get",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message:
//         "with Subcategories Products Count Get data not working." +
//         error.message,
//     });
//   }
// };

// const categorySubcategory = async (req, res) => {
//   console.log("categorySubcategory");

//   try {
//     const categoryId = await Category.findById(req.params.id);
//     console.log(categoryId._id);

//     const category = await Category.aggregate([
//       {
//         $match: {
//           _id: categoryId._id,
//         },
//       },
//       {
//         $lookup: {
//           from: "subcategaries",
//           localField: "_id",
//           foreignField: "Category_id",
//           as: "subCategories",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           subCategories: 1,
//         },
//       },
//     ]);

//     if (!category) {
//       res.status(404).json({
//         success: false,
//         data: {},
//         message: "A specific Category not Get.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: category,
//       message: "A specific Category Get",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: {},
//       message: "Category and Subcategory Get data not working." + error.message,
//     });
//   }
// };

// module.exports = {
//   ListCategary,
//   GetCategary,
//   AddCategary,
//   UpdataCategary,
//   DeleteCategary,
//   countActiveCategories,
//   mostProductsCategories,
//   averageProductsCategories,
//   inActiveCategories,
//   countSubcategories,
//   withSubcategoriesProductsCount,
//   categorySubcategory,
// };
