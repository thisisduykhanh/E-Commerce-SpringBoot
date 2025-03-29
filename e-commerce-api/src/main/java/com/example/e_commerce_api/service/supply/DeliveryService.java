package com.example.e_commerce_api.service.supply;

import com.example.e_commerce_api.dto.supply.DeliveryCreateDTO;
import com.example.e_commerce_api.dto.supply.DeliveryUpdateDTO;
import com.example.e_commerce_api.entity.supply.Delivery;
import com.example.e_commerce_api.entity.supply.Supplier;
import com.example.e_commerce_api.repository.supply.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryService {
    @Autowired
    private DeliveryRepository deliveryRepository;

    // Tìm danh sách Delivery theo Supplier
    /**
     * Tìm danh sách các giao hàng (`Delivery`) dựa trên nhà cung cấp (`Supplier`).
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra tham số `supplier`:
     *    - Nếu `supplier` là null, ném ra ngoại lệ `IllegalArgumentException` với thông báo "Supplier cannot be null".
     *    - Điều này đảm bảo tính hợp lệ của tham số và tránh lỗi trong quá trình xử lý.
     * 2. Gọi `deliveryRepository.findBySupplier()` để truy vấn danh sách `Delivery` tương ứng với `Supplier`.
     * 3. Trả về danh sách `Delivery` từ repository.
     *
     * @param supplier Đối tượng nhà cung cấp (`Supplier`) được sử dụng để tìm kiếm các giao hàng liên quan.
     * @return Danh sách các giao hàng (`Delivery`) liên kết với `Supplier` đã cung cấp.
     * @throws IllegalArgumentException Nếu `supplier` là null.
     */
    public List<Delivery> findBySupplier(Supplier supplier) {
        if (supplier == null) {
            throw new IllegalArgumentException("Supplier cannot be null");
        }
        return deliveryRepository.findBySupplier(supplier);
    }
    public void createDelivery(DeliveryCreateDTO dto, Supplier supplier){
        Delivery delivery=new Delivery();
//        delivery.setDeliveryId(getGenerationId());
        delivery.setInfo(dto.info());
        delivery.setSupplier(supplier);
        deliveryRepository.save(delivery);
    }
    public void updateDelivery(DeliveryUpdateDTO dto){
        Delivery delivery=deliveryRepository.findById(dto.id()).orElseThrow();
        if(dto.info()!=null){
            delivery.setInfo(dto.info());
        }
        deliveryRepository.save(delivery);
    }
//    public Integer getGenerationId() {
//        UUID uuid = UUID.randomUUID();
//        // Use most significant bits and ensure it's within the integer range
//        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
//    }

}
