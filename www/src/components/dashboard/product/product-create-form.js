"use client";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";

import { paths } from "@/paths";
import { TextEditor } from "@/components/core/text-editor/text-editor";
import {
  getSuppliers,
} from "@/services/supplier";

import { createProduct } from "@/services/products";

import { useEffect, useState, useCallback } from "react";
import { getGroups } from "@/services/product-group";
import {logger} from "@/lib/default-logger";



// const suppliers = [
//   { id: 1, name: "Apple" },
//   { id: 2, name: "Oppo" },
// ];

const groupAttributes = {
  headphone: [
    { name: "isWireless", type: "checkbox" },
    { name: "batteryLife", type: "number" },
    { name: "noiseCancellation", type: "text" },
  ],
  laptop: [
    { name: "cpu", type: "text" },
    { name: "ram", type: "number" },
    { name: "storage", type: "number" },
  ],
  smartwatch: [
    { name: "hasGPS", type: "checkbox" },
    { name: "waterResistant", type: "checkbox" },
    { name: "batteryLife", type: "number" },
  ],
  phone: [
    { name: "batteryLife", type: "number" },
    { name: "cameraMP", type: "number" },
    { name: "screenSize", type: "text" },
  ],
  tablet: [
    { name: "screenSize", type: "text" },
    { name: "batteryLife", type: "number" },
    { name: "hasPenSupport", type: "checkbox" },
  ],
};

export function ProductCreateForm() {
  const _router = useRouter();

  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [preview, setPreview] = useState({});
  const [imageInputs, setImageInputs] = useState([0]);
  const [attributesSelections, setAttributesSelections] = useState({});
  const [groupAttributesList, setGroupAttributesList] = useState([]);

  const [suppliers, setSuppliers] = useState([]);

  const fetchProductTypes = async () => {
    try {
      const response = await getGroups();
        if (response && response.data) {
          console.log("ProductGroups:", response.data);

            setProductTypes(response.data);

        } else {
            console.error("No data found in response:", response);
        }

    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };


  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      if (response && response.data) {
        console.log("Suppliers:", response.data);
        setSuppliers(response.data);
      } else {
        console.error("No data found in response:", response);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchProductTypes();
    fetchSuppliers();
  }, []);



  const handleGroupChange = (event) => {
    const groupId = event.target.value;
    setSelectedProductType(groupId);

    setAttributesSelections({}); // Reset hardware selections when group changes
    const selectedGroupName = productTypes.find((type) => type.id === groupId)?.productTypeName;
    setGroupAttributesList(groupAttributes[selectedGroupName.toLowerCase()] || []);

    // console.log("Selected group:", selectedGroupName);
    // console.log("Group attributes:", groupAttributesList);

  };

  const addImageInput = () => {
    setImageInputs((prev) => [...prev, prev.length]);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(async (event) => {
    // Ensure all checkbox attributes are set to false if not explicitly checked
    const updatedAttributesSelections = { ...attributesSelections };
    groupAttributesList.forEach((attribute) => {
      if (attribute.type === "checkbox" && updatedAttributesSelections[attribute.name] === undefined) {
        updatedAttributesSelections[attribute.name] = false;
      }
    });

    // Validate attributes
    const missingAttributes = groupAttributesList.some(
      (attribute) =>
        updatedAttributesSelections[attribute.name] === undefined ||
        updatedAttributesSelections[attribute.name] === ""
    );

    if (missingAttributes) {
      alert("Vui lòng nhập đầy đủ các thuộc tính của sản phẩm.");
      return;
    }

    // Include attributesSelections in the form data in the correct order
    const formData = new FormData();
    formData.append("productName", event.name);
    formData.append("supplierId", event.supplierId);
    formData.append("price", event.price);
    formData.append("productTypeId", event.productTypeId);
    formData.append("description", event.description);
    formData.append("quantity", event.quantity);

    groupAttributesList.forEach((attribute) => {
      formData.append("attributes", updatedAttributesSelections[attribute.name]);
    });

    event.images?.forEach((imgFile) => {
      if (imgFile && imgFile[0] && imgFile[0].size > 0) {
        formData.append("images", imgFile[0]);
      } 
    });

    if(formData.getAll("images").length === 0) {
      alert(`Vui lòng cung cấp ít nhất 1 hình ảnh.`);
      return;
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    logger.debug(formData);

    // Gửi dữ liệu qua fetch
    try {
      const response = await createProduct(formData);

      if (response.success) {
        _router.push(paths.dashboard.products.list);
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi tạo sản phẩm. Vui lòng kiểm tra lại đầy đủ thông tin.");
      console.error("Error submitting form:", error);
    }
  }, [attributesSelections, groupAttributesList]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Stack divider={<Divider />} spacing={4}>
              <Stack spacing={3}>
                <Typography variant="h6">Thông tin cơ bản</Typography>
                <Grid container rowSpacing={2} columnSpacing={10}>
                  <Grid item md={6} xs={12}>
                    <Controller
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.name)}
                          fullWidth
                        >
                          <InputLabel required>Tên sản phẩm</InputLabel>
                          <OutlinedInput {...field} value={field.value ?? ""} />
                          {errors.name ? (
                            <FormHelperText>
                              {errors.name.message}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Controller
                      control={control}
                      name="price"
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.price)}
                          fullWidth
                        >
                          <InputLabel required>Giá sản phẩm</InputLabel>
                          <OutlinedInput {...field} type="number" value={field.value ?? ""} />
                          {errors.price ? (
                            <FormHelperText>
                              {errors.price.message}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Controller
                      control={control}
                      name="productTypeId"
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.selectedProductType)}
                          fullWidth
                        >
                          <InputLabel>Loại sản phẩm</InputLabel>
                          <Select
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleGroupChange(e);
                            }}
                            value={field.value ?? ""}
                          >
                            <MenuItem value="" disabled>
                              Chọn loại sản phẩm
                            </MenuItem>
                            {productTypes.map((type) => (
                              <MenuItem key={type.id} value={type.id}>
                                {type.productTypeName}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.selectedProductType ? (
                            <FormHelperText>
                              {errors.selectedProductType.message}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  {selectedProductType && groupAttributesList.length > 0 ? <Grid item xs={12}>
                      <Typography variant="h6">Thuộc tính nhóm sản phẩm</Typography>
                      <Grid container spacing={2}>
                        {groupAttributesList.map((attribute) => (
                          <Grid item xs={12} sm={4} key={attribute.name}>
                            <Controller
                              control={control}
                              name={`attributes.${attribute.name}`}
                              render={({ field }) => (
                                <FormControl fullWidth>
                                  <InputLabel>{attribute.name}</InputLabel>
                                  {attribute.type === "checkbox" ? (
                                    <input
                                      type="checkbox"
                                      checked={attributesSelections[attribute.name] || false}
                                      onChange={(e) => {
                                        const value = e.target.checked;
                                        field.onChange(value);
                                        setAttributesSelections((prev) => ({
                                          ...prev,
                                          [attribute.name]: value,
                                        }));
                                      }}
                                    />
                                  ) : (
                                    <OutlinedInput
                                      {...field}
                                      type={attribute.type}
                                      placeholder={`Nhập ${attribute.name}`}
                                      value={attributesSelections[attribute.name] || ""}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value);
                                        setAttributesSelections((prev) => ({
                                          ...prev,
                                          [attribute.name]: value,
                                        }));
                                      }}
                                    />
                                  )}
                                </FormControl>
                              )}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid> : null}
                  <Grid item md={6} xs={12}>
                    <Controller
                      control={control}
                      name="supplierId"
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.supplierId)}
                          fullWidth
                        >
                          <InputLabel>Nhà cung cấp</InputLabel>
                          <Select
                            {...field}
                            value={field.value ?? ""}
                          >
                            <MenuItem value="" disabled>
                              Chọn nhà cung cấp
                            </MenuItem>
                            {suppliers.map((supplier) => (
                              <MenuItem key={supplier.id} value={supplier.id}>
                                {supplier.supplyName}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.supplierId ? (
                            <FormHelperText>
                              {errors.supplierId.message}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} width="100%">
                    <Controller
                      control={control}
                      name="description"
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.description)}
                          fullWidth
                        >
                          <InputLabel>Mô tả</InputLabel>
                          <Box
                            sx={{
                              mt: "8px",
                              "& .tiptap-container": { height: "200px" },
                            }}
                          >
                            <TextEditor
                              content={field.value ?? ""}
                              onUpdate={({ editor }) => {
                                field.onChange(editor.getText());
                              }}
                              placeholder="Viết chi tiết về sản phẩm"
                            />
                          </Box>
                          {errors.description ? (
                            <FormHelperText>
                              {errors.description.message}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                  </Grid>



                  <Grid container flexDirection="column" spacing={4}>
                    {/* Phần số lượng */}
                    <Grid item xs={12}>
                      <Controller
                        control={control}
                        name="quantity"
                        render={({ field }) => (
                          <FormControl
                            error={Boolean(errors?.quantity)}
                            fullWidth
                          >
                            <InputLabel required>Số Lượng</InputLabel>

                            <OutlinedInput
                              {...field}
                              type="number"
                              placeholder="Nhập số lượng"
                            />
                            {errors?.quantity ? <FormHelperText>
                                {errors?.quantity.message}
                              </FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <InputLabel required>Hình Ảnh</InputLabel>

                        <Grid container rowSpacing={2} columnSpacing={18}>
                        {imageInputs.map((index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                            <Controller
                                control={control}
                                name={`images[${index}]`}
                                render={({ field }) => (
                                <FormControl fullWidth>
                                    <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    >
                                    <InputLabel
                                        shrink
                                        style={{ marginBottom: "8px" }}
                                    >
                                        Hình {index + 1}
                                    </InputLabel>
                                    <OutlinedInput
                                        type="file"
                                        onChange={(e) => {
                                        field.onChange(e.target.files);
                                        const showFile = e.target.files[0];
                                        if (showFile) {
                                            const previewUrl =
                                            URL.createObjectURL(showFile);
                                            setPreview((prev) => ({
                                            ...prev,
                                            [index]: previewUrl,
                                            }));
                                        }
                                        }}
                                        inputProps={{
                                        accept: "image/*",
                                        }}
                                        style={{
                                        padding: "8px",
                                        borderRadius: "8px",
                                        }}
                                    />
                                    </Box>
                                    {preview[index] ? <Box
                                        mt={2}
                                        width="100%"
                                        height="150px"
                                        style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        overflow: "hidden",
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        }}
                                    >
                                        <img
                                        src={preview[index]}
                                        alt={`Preview ${index + 1}`}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain",
                                        }}
                                        />
                                    </Box> : null}
                                </FormControl>
                                )}
                            />
                            </Grid>
                        ))}
                        </Grid>
                        <Button
                        variant="outlined"
                        onClick={addImageInput}
                        sx={{ mt: 2 }}
                        >
                        Thêm hình ảnh
                        </Button>
                    </Grid>
                </Grid>
              </Stack>
            </Stack>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: "flex-end",
              gap: 2,
              padding: 2,
              bgcolor: "background.default",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Button
              color="inherit"
              component={RouterLink}
              href={paths.supplier.products.list}
              sx={{
                color: "white",
                backgroundColor: "error.main",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "error.dark",
                },
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              color="inherit"
              fontWeight="bold"
              sx={{
                backgroundColor: "green",
                color: "white",
                textTransform: "none",
                boxShadow: 3,
                "&:hover": {
                  boxShadow: 6,
                  backgroundColor: "green",
                },
              }}
            >
              Tạo sản phẩm
            </Button>
          </CardActions>
        </Card>
      </form>
  );
}
