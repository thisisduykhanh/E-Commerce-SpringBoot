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
import { z as zod } from "zod";

import { paths } from "@/paths";
import { TextEditor } from "@/components/core/text-editor/text-editor";
import {
  getProductType,
} from "@/services/supplier";

import { createProduct } from "@/services/products";

import { useEffect, useState, useCallback } from "react";
import { getGroups } from "@/services/product-group";
import {logger} from "@/lib/default-logger";



const suppliers = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Oppo" },
];

const groupAttributes = {
  headphone: ["is Wireless", "Battery Life", "Noise Cancellation"],
  laptop: ["CPU", "RAM", "Storage"],
  smartwatch: ["GPS", "Water Resistance", "Battery Life"],
  phone: ["Battery Capacity", "Camera", "Screen Size"],
  tablet: ["Screen Size", "Battery Life", "Pen Support"],
};

export function ProductCreateForm() {
  const _router = useRouter();

  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [preview, setPreview] = useState({});
  const [imageInputs, setImageInputs] = useState([0]);
  const [attributesSelections, setAttributesSelections] = useState({});
  const [groupAttributesList, setGroupAttributesList] = useState([]);

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

  useEffect(() => {
    fetchProductTypes();
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


    // Include attributesSelections in the form data
    const formData = new FormData();
    formData.append("productName", event.name);
    formData.append("supplierId", event.supplierId);
    // formData.append("attributes", JSON.stringify(Object.values(attributesSelections)));
    formData.append("price", event.price);
    formData.append("productTypeId", event.productTypeId);
    formData.append("description", event.description);
    formData.append("quantity", event.quantity);


    Object.values(attributesSelections).forEach((value) => {
      formData.append("attributes", value);
    });

    event.images.forEach((imgFile) => {
      formData.append("images", imgFile[0]);
    });


    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    logger.debug(formData)

    // Gửi dữ liệu qua fetch
    try {
      const response = await createProduct(formData);

      if (response.success) {

        _router.push(paths.supplier.products.list);
      }


    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }, []);


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Stack divider={<Divider />} spacing={4}>
              <Stack spacing={3}>
                <Typography variant="h6">Thông tin cơ bản</Typography>
                <Grid container={true} rowSpacing={2} columnSpacing={10}>
                  <Grid item={true} md={6} xs={12}>
                    <Controller
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.name)}
                          fullWidth={true}
                        >
                          <InputLabel required={true}>Tên sản phẩm</InputLabel>
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
                  <Grid item={true} md={6} xs={12}>
                    <Controller
                      control={control}
                      name="price"
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.price)}
                          fullWidth={true}
                        >
                          <InputLabel required={true}>Giá sản phẩm</InputLabel>
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
                  <Grid item={true} md={6} xs={12}>
                    <Controller
                      control={control}
                      name="productTypeId"
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.selectedProductType)}
                          fullWidth={true}
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
                            <MenuItem value="" disabled={true}>
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

                  {selectedProductType && groupAttributesList.length > 0 && (
                    <Grid item={true} xs={12}>
                      <Typography variant="h6">Thuộc tính nhóm sản phẩm</Typography>
                      <Grid container={true} spacing={2}>
                        {groupAttributesList.map((attribute) => (
                          <Grid item={true} xs={12} sm={4} key={attribute}>
                            <Controller
                              control={control}
                              name={`attributes.${attribute}`}
                              render={({ field }) => (
                                <FormControl fullWidth={true}>
                                  <InputLabel>{attribute}</InputLabel>
                                  <OutlinedInput
                                    {...field}
                                    placeholder={`Nhập ${attribute}`}
                                    value={attributesSelections[attribute] || ""}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      field.onChange(value);
                                      setAttributesSelections((prev) => ({
                                        ...prev,
                                        [attribute]: value, // dynamically set the correct key
                                      }));
                                    }}

                                  />
                                </FormControl>
                              )}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}
                  <Grid item={true} md={6} xs={12}>
                    <Controller
                      control={control}
                      name="supplierId"
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.supplierId)}
                          fullWidth={true}
                        >
                          <InputLabel>Nhà cung cấp</InputLabel>
                          <Select
                            {...field}
                            value={field.value ?? ""}
                          >
                            <MenuItem value="" disabled={true}>
                              Chọn nhà cung cấp
                            </MenuItem>
                            {suppliers.map((supplier) => (
                              <MenuItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
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

                  <Grid item={true} xs={12} width="100%">
                    <Controller
                      control={control}
                      name="description"
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.description)}
                          fullWidth={true}
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



                  <Grid container={true} flexDirection="column" spacing={4}>
                    {/* Phần số lượng */}
                    <Grid item={true} xs={12}>
                      <Controller
                        control={control}
                        name={`quantity`}
                        render={({ field }) => (
                          <FormControl
                            error={Boolean(errors?.quantity)}
                            fullWidth={true}
                          >
                            <InputLabel required={true}>Số Lượng</InputLabel>

                            <OutlinedInput
                              {...field}
                              type="number"
                              placeholder="Nhập số lượng"
                            />
                            {errors?.quantity && (
                              <FormHelperText>
                                {errors?.quantity.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12}>
                    <InputLabel required={true}>Hình Ảnh</InputLabel>

                        <Grid container={true} rowSpacing={2} columnSpacing={18}>
                        {imageInputs.map((index) => (
                            <Grid item={true} xs={12} sm={6} md={3} key={index}>
                            <Controller
                                control={control}
                                name={`images[${index}]`}
                                render={({ field }) => (
                                <FormControl fullWidth={true}>
                                    <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    >
                                    <InputLabel
                                        shrink={true}
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
                                    {preview[index] && (
                                    <Box
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
                                    </Box>
                                    )}
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
    </>
  );
}
