package com.example.e_commerce_api.service.supply;

import com.example.e_commerce_api.entity.product.Product;
import com.example.e_commerce_api.entity.supply.Image;
import com.example.e_commerce_api.repository.supply.ImageRepository;
import com.example.e_commerce_api.service.CloudinaryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    /**
     * Lấy danh sách hình ảnh (`Image`) liên kết với sản phẩm (`Product`).
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Gọi `imageRepository.findAllByProduct()` để truy vấn danh sách các hình ảnh (`Image`) từ cơ sở dữ liệu.
     *    - Truy vấn dựa trên sản phẩm (`Product`) được cung cấp.
     * 2. Trả về danh sách `Image` từ repository.
     *
     * **Lưu ý:** Phương thức này giả định rằng:
     * - `product` không phải là null (việc kiểm tra tính hợp lệ của tham số này phải được xử lý trước khi gọi phương thức này).
     * - `imageRepository` đã được định nghĩa và cung cấp phương thức `findAllByProduct()` phù hợp.
     *
     * @param product Đối tượng sản phẩm (`Product`) để tìm kiếm các hình ảnh liên quan.
     * @return Danh sách các hình ảnh (`Image`) liên kết với sản phẩm.
     */
    public List<Image> getImageByProduct(Product product) {
        return imageRepository.findAllByProduct(product);
    }



    public String saveImage(MultipartFile imageFile) {
        log.info("Uploading image");
        Map<String, Object> resultMap = cloudinaryService.upload(imageFile);
        String imageUrl = (String) resultMap.get("url");
        return imageUrl;
    }
//    public Integer getGenerationId() {
//        UUID uuid = UUID.randomUUID();
//        // Use most significant bits and ensure it's within the integer range
//        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
//    }

}
