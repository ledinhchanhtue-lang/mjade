export type PolicySection = { heading: string; body: string[]; list?: string[] };

export const buyingGuide: PolicySection[] = [
  {
    heading: "1. Chọn sản phẩm hoặc đặt lịch tư vấn",
    body: [
      "Bạn có thể duyệt Bộ sưu tập trên website, hoặc đặt lịch tư vấn riêng nếu muốn được gợi ý theo nhu cầu, ngân sách và dịp sử dụng. Với sản phẩm giới hạn, tư vấn riêng giúp bạn xem chi tiết vân ngọc và sắc độ thật.",
    ],
  },
  {
    heading: "2. Xem ngọc trực tiếp hoặc qua video call",
    body: [
      "MJADE khuyến khích xem ngọc trước khi quyết định. Khách ở xa được hỗ trợ video call với ánh sáng trung thực, quay cận vân đá và giấy kiểm định đi kèm.",
    ],
  },
  {
    heading: "3. Xác nhận đơn và thanh toán",
    body: [
      "Sau khi bạn xác nhận, MJADE gửi thông tin đơn hàng gồm mã sản phẩm, giá và phương thức thanh toán (chuyển khoản ngân hàng). Với đơn quốc tế, phương án vận chuyển và bảo hiểm được chốt trước khi thanh toán.",
    ],
  },
  {
    heading: "4. Nhận hàng và kiểm tra",
    body: [
      "Sản phẩm được gửi kèm hộp, chứng thư kiểm định và hóa đơn. Bạn nên quay video khi mở hộp lần đầu — đây là căn cứ xử lý nhanh nhất nếu có vấn đề phát sinh trong vận chuyển.",
    ],
  },
];

export const warrantyPolicy: PolicySection[] = [
  {
    heading: "Cam kết Type A trọn đời sản phẩm",
    body: [
      "Mọi sản phẩm MJADE được cam kết là ngọc phỉ thúy tự nhiên Type A. Nếu bất kỳ đơn vị kiểm định đá quý độc lập nào kết luận sản phẩm không đúng cam kết, MJADE hoàn tiền 100% không giới hạn thời gian.",
    ],
  },
  {
    heading: "Bảo hành chế tác",
    body: ["Phạm vi bảo hành phần chế tác kim loại (ổ đính, khóa, dây):"],
    list: [
      "12 tháng bảo hành miễn phí lỗi chế tác.",
      "Siết ổ đính, đánh bóng kim loại miễn phí trọn đời.",
      "Làm sạch chuyên sâu miễn phí định kỳ.",
      "Hư hỏng do va đập, tai nạn được hỗ trợ sửa chữa với chi phí ưu đãi.",
    ],
  },
  {
    heading: "Ngoài phạm vi bảo hành",
    body: [
      "Nứt vỡ ngọc do va đập mạnh, trầy xước do sử dụng, và hư hỏng do can thiệp sửa chữa bên thứ ba không thuộc phạm vi bảo hành miễn phí — MJADE vẫn hỗ trợ đánh giá và tư vấn phương án xử lý tốt nhất.",
    ],
  },
];

export const returnPolicy: PolicySection[] = [
  {
    heading: "Đổi trả trong 7 ngày",
    body: [
      "Bạn được đổi hoặc trả sản phẩm trong 7 ngày kể từ khi nhận hàng nếu sản phẩm còn nguyên trạng, chưa qua sử dụng, đầy đủ hộp, chứng thư và hóa đơn.",
    ],
  },
  {
    heading: "Trường hợp được hoàn tiền 100%",
    body: [""],
    list: [
      "Sản phẩm không đúng cam kết Type A theo kết luận kiểm định độc lập.",
      "Sản phẩm giao sai mẫu, sai mã so với đơn đặt.",
      "Sản phẩm có lỗi chế tác được xác nhận bởi MJADE.",
    ],
  },
  {
    heading: "Đổi trả với đơn quốc tế",
    body: [
      "Khách quốc tế được áp dụng cùng chính sách; thời hạn tính từ ngày nhận theo tracking. Chi phí gửi trả với lý do từ phía khách do khách chi trả; với lỗi từ MJADE, chúng tôi chịu toàn bộ chi phí hai chiều.",
    ],
  },
  {
    heading: "Sản phẩm thiết kế riêng",
    body: [
      "Sản phẩm chế tác riêng theo yêu cầu (kích thước, khắc chữ, thiết kế cá nhân) không áp dụng đổi trả, trừ trường hợp lỗi chế tác hoặc không đúng cam kết chất lượng.",
    ],
  },
];

export const shippingInfo: PolicySection[] = [
  {
    heading: "Điểm đến được hỗ trợ",
    body: [
      "MJADE giao hàng toàn quốc tại Việt Nam và phục vụ khách hàng quốc tế — đặc biệt là cộng đồng người Việt tại Mỹ, Canada, Úc, châu Âu và Đông Á. Danh sách điểm đến được tư vấn cụ thể theo từng đơn.",
    ],
  },
  {
    heading: "Quy trình tư vấn vận chuyển",
    body: [
      "Trước khi gửi, MJADE xác nhận cùng bạn: phương thức vận chuyển phù hợp, mức bảo hiểm hàng hóa, thời gian dự kiến và chứng từ đi kèm. Không có phụ phí ẩn — mọi chi phí được chốt trước khi thanh toán.",
    ],
  },
  {
    heading: "Đóng gói và bảo hiểm",
    body: [
      "Sản phẩm được đóng hộp cứng chống sốc, niêm phong và có phương án bảo hiểm phù hợp với giá trị đơn hàng. Chứng thư kiểm định và hóa đơn luôn đi kèm trong kiện hàng.",
    ],
  },
  {
    heading: "Thuế và thời gian nhận hàng",
    body: [
      "Thuế nhập khẩu và lệ phí tại nước nhận (nếu có) tùy quy định từng quốc gia và do người nhận chi trả — MJADE tư vấn ước tính trước khi gửi. Thời gian vận chuyển phụ thuộc hãng vận chuyển và thủ tục hải quan từng nước, vì vậy được báo theo từng đơn thay vì cam kết cố định.",
    ],
  },
  {
    heading: "Đổi trả với đơn quốc tế",
    body: [
      "Chính sách đổi trả 7 ngày áp dụng cho cả đơn quốc tế, tính từ ngày nhận theo tracking. Xem chi tiết tại Chính sách đổi trả.",
    ],
  },
];
