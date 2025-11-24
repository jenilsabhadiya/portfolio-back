// const express = require("express");
// const { CategaryController } = require("../../../controller");
// const upload = require("../../../File/upload");
// const auth = require("../../../File/Auth");

// const router = express.Router();

// router.get(
//   "/list-category",
//   auth(["user", "admin"]),
//   ("/path",
//   (req, res, next) => {
//     /*  #swagger.tags = ['Categary']
//         #swagger.security = [{
//             "apiKeyAuth": []
//     }] */
//     next();
//   }),
//   CategaryController.ListCategary
// );

// router.get(
//   "/get-category/:id",
//   ("/path",
//   (req, res, next) => {
//     // #swagger.tags = ['Categary']
//     next();
//   }),
//   CategaryController.GetCategary
// );

// router.post(
//   "/create-category",
//   upload.single("category_image"),
//   ("/path",
//   (req, res, next) => {
//     /*  #swagger.tags = ['Categary']
//         #swagger.consumes = ['multipart/form-data']  
//         #swagger.parameters['category_image'] = {
//             in: 'formData',
//             type: 'file',
//             required: 'true',
//             description: 'Some description...',
//           }
//         #swagger.parameters['name'] = {
//             in: 'formData',
//             type: 'string',
//             required: 'true',
//             description: 'Some description...',
//           }
//         #swagger.parameters['description'] = {
//             in: 'formData',
//             type: 'string',
//             required: 'true',
//             description: 'Some description...',
//           }
//     */
//     next();
//   }),
//   CategaryController.AddCategary
// );

// router.put(
//   "/update-category/:id",
//   upload.single("category_image"),
//   ("/path",
//   (req, res, next) => {
//     // #swagger.tags = ['Categary']
//     next();
//   }),
//   CategaryController.UpdataCategary
// );

// router.delete(
//   "/delete-category/:id",
//   ("/path",
//   (req, res, next) => {
//     // #swagger.tags = ['Categary']
//     next();
//   }),
//   CategaryController.DeleteCategary
// );

// router.get(
//   "/count-active",
//   ("/path",
//   (req, res, next) => {
//     // #swagger.tags = ['Categary']
//     next();
//   }),
//   CategaryController.countActiveCategories
// );
// router.get(
//   "/most-products",
//   ("/path",
//   (req, res, next) => {
//     // #swagger.tags = ['Categary']
//     next();
//   }),
//   CategaryController.mostProductsCategories
// );
// router.get(
//   "/average-products",
//   ("/path",
//   (req, res, next) => {
//     // #swagger.tags = ['Categary']
//     next();
//   }),
//   CategaryController.averageProductsCategories
// );
// router.get(
//   "/inactive",
//   ("/path",
//   (req, res, next) => {
//     // #swagger.tags = ['Categary']
//     next();
//   }),
//   CategaryController.inActiveCategories
// );
// router.get(
//   "/count-subcategories",
//   ("/path",
//   (req, res, next) => {
//     // #swagger.tags = ['Categary']
//     next();
//   }),
//   CategaryController.countSubcategories
// );
// router.get(
//   "/with-subcategories-products-count",
//   ("/path",
//   (req, res, next) => {
//     // #swagger.tags = ['Categary']
//     next();
//   }),
//   CategaryController.withSubcategoriesProductsCount
// );
// router.get(
//   "/category-subcategory/:id",
//   ("/path",
//   (req, res, next) => {
//     // #swagger.tags = ['Categary']
//     next();
//   }),
//   CategaryController.categorySubcategory
// );

// module.exports = router;
