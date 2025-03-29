package com.example.e_commerce_api.service.product;


import com.example.e_commerce_api.dto.product.OfficialPriceCreateDTO;
import com.example.e_commerce_api.dto.product.OfficialPriceUpdateDTO;
import com.example.e_commerce_api.entity.product.OfficialPrice;
import com.example.e_commerce_api.entity.product.Product;
import com.example.e_commerce_api.repository.product.OfficialPriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
//import java.util.UUID;


@Service
public class OfficialPriceService {
    @Autowired
    private OfficialPriceRepository officialPriceRepository;
    /**
     * Lấy danh sách giá chính thức (`OfficialPrice`) liên kết với sản phẩm (`Product`).
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Gọi `officialPriceRepository.findAllByProduct()` để truy vấn danh sách các giá chính thức (`OfficialPrice`) từ cơ sở dữ liệu.
     *    - Truy vấn dựa trên sản phẩm (`Product`) được cung cấp.
     * 2. Trả về danh sách `OfficialPrice` từ repository.
     *
     * **Lưu ý:**
     * - Phương thức này giả định rằng `product` không phải là null. Việc kiểm tra tính hợp lệ của tham số phải được xử lý trước khi gọi phương thức này.
     * - `officialPriceRepository` đã được định nghĩa và cung cấp phương thức `findAllByProduct()` phù hợp.
     *
     * @param product Đối tượng sản phẩm (`Product`) được sử dụng để tìm kiếm danh sách giá chính thức.
     * @return Danh sách các giá chính thức (`OfficialPrice`) liên kết với sản phẩm.
     */

    @Transactional
    public List<OfficialPrice> findByProduct(Product product) {
        return officialPriceRepository.findAllByProduct(product);
    }

    @Transactional
    public void save(OfficialPriceCreateDTO officialPriceCreateDTO, Product product){
        OfficialPrice officialPrice=new OfficialPrice();
//        officialPrice.setId(getGenerationId());
        officialPrice.setPrice(officialPriceCreateDTO.price());
        officialPrice.setMinQuantity(officialPriceCreateDTO.minQuantity());
        officialPrice.setMaxQuantity(officialPriceCreateDTO.maxQuantity());
        officialPrice.setProduct(product);
        officialPriceRepository.save(officialPrice);
    }

    @Transactional
    public void update(OfficialPriceUpdateDTO officialPriceUpdateDTO){
        OfficialPrice officialPrice=officialPriceRepository.findById(officialPriceUpdateDTO.id()).orElseThrow();
        if (officialPriceUpdateDTO.minQuantity() != null) {
            officialPrice.setMinQuantity(officialPriceUpdateDTO.minQuantity());
        }

        if (officialPriceUpdateDTO.maxQuantity() != null) {
            officialPrice.setMaxQuantity(officialPriceUpdateDTO.maxQuantity());
        }

        if (officialPriceUpdateDTO.price() != null) {
            officialPrice.setPrice(officialPriceUpdateDTO.price());
        }

        // Lưu lại
        officialPriceRepository.save(officialPrice);
    }
//    public Integer getGenerationId() {
//        UUID uuid = UUID.randomUUID();
//        // Use most significant bits and ensure it's within the integer range
//        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
//    }
}
