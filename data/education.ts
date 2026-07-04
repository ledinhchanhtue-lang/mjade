export type EduSection = {
  id: string;
  heading: string;
  body: string[];
  list?: string[];
};

export const educationSections: EduSection[] = [
  {
    id: "ngoc-phi-thuy-la-gi",
    heading: "Ngọc phỉ thúy là gì?",
    body: [
      "Ngọc phỉ thúy (jadeite) là một trong hai khoáng vật được gọi chung là 'ngọc' (jade), hình thành trong điều kiện áp suất cao hiếm gặp. Nguồn jadeite chất lượng trang sức quan trọng nhất thế giới nằm ở miền bắc Myanmar.",
      "Sắc xanh của phỉ thúy đến từ nguyên tố crôm — dải màu trải từ xanh non trong trẻo đến xanh lục đậm sâu, mỗi viên mang cấu trúc và sắc độ không lặp lại.",
    ],
  },
  {
    id: "jadeite-vs-nephrite",
    heading: "Jadeite và nephrite khác nhau như thế nào?",
    body: [
      "Cùng gọi là 'ngọc' nhưng jadeite và nephrite là hai khoáng vật khác nhau. Jadeite (phỉ thúy) hiếm hơn, cứng hơn, cho độ trong và sắc xanh rực rỡ hơn — vì vậy giá trị thường cao hơn đáng kể.",
      "Nephrite (ngọc bích mềm) phổ biến hơn, thường có màu xanh sẫm ngả xám hoặc trắng kem, bề mặt ánh dầu thay vì ánh thủy tinh của jadeite.",
    ],
  },
  {
    id: "type-a-b-c",
    heading: "Type A, Type B và Type C là gì?",
    body: [
      "Đây là phân loại theo mức độ can thiệp xử lý — yếu tố quyết định giá trị lâu dài của sản phẩm:",
    ],
    list: [
      "Type A — tự nhiên hoàn toàn: chỉ cắt, mài, đánh bóng. Giữ giá trị bền vững, càng đeo càng đẹp.",
      "Type B — đã tẩy axit và ngâm nhựa polymer để tăng độ trong. Cấu trúc đá bị tổn hại, xuống cấp theo thời gian.",
      "Type C — nhuộm màu nhân tạo. Màu phai dần khi tiếp xúc ánh sáng và mồ hôi.",
      "Type B+C — vừa ngâm nhựa vừa nhuộm màu; giá trị thấp nhất.",
    ],
  },
  {
    id: "mau-sac",
    heading: "Màu sắc",
    body: [
      "Màu được đánh giá theo ba tiêu chí: sắc (hue) — xanh thuần hay ngả vàng/xám; độ đậm (saturation) — càng rực càng quý; và độ đều (evenness) — màu trải đều khắp viên hiếm hơn màu loang.",
      "Ngoài xanh lục, phỉ thúy còn có màu trắng, vàng mật, tím lavender và đen — mỗi màu có vẻ đẹp và nhóm người yêu thích riêng.",
    ],
  },
  {
    id: "do-trong",
    heading: "Độ trong (translucency)",
    body: [
      "Độ trong là khả năng ánh sáng xuyên qua viên ngọc — từ đục (opaque), bán trong (semi-translucent) đến gần trong suốt (highly translucent, thường gọi là 'ngọc kính').",
      "Cùng một màu, viên có độ trong cao hơn sẽ 'sống' hơn hẳn khi đeo — ánh sáng đi vào trong đá rồi tỏa ngược ra, tạo cảm giác viên ngọc phát sáng từ bên trong.",
    ],
  },
  {
    id: "ket-cau",
    heading: "Kết cấu",
    body: [
      "Kết cấu càng mịn, bề mặt đánh bóng càng căng mượt. Các điểm 'bông tuyết', vân đá tự nhiên không phải khuyết điểm — chúng là dấu vân tay của tự nhiên và là căn cứ nhận diện từng viên ngọc.",
    ],
  },
  {
    id: "kich-thuoc-che-tac",
    heading: "Kích thước và chế tác",
    body: [
      "Khối ngọc nguyên vẹn đủ lớn để chế tác vòng bản hiếm hơn nhiều so với ngọc làm mặt dây hay nhẫn — đó là lý do vòng bản cùng chất lượng luôn có giá cao hơn.",
      "Tay nghề chế tác thể hiện ở độ cân đối của phom dáng, độ dày đều và chất lượng đánh bóng — những chi tiết chỉ nhận ra khi cầm sản phẩm trên tay.",
    ],
  },
  {
    id: "cach-quan-sat",
    heading: "Cách quan sát một sản phẩm ngọc",
    body: ["Khi xem ngọc trực tiếp, bạn có thể thực hiện tuần tự:"],
    list: [
      "Nhìn dưới ánh sáng tự nhiên gián tiếp — màu thật hiện rõ nhất, tránh đèn vàng thương mại.",
      "Soi ngược sáng để quan sát độ trong và cấu trúc bên trong.",
      "Quan sát bề mặt nghiêng — ngọc tự nhiên có ánh thủy tinh sắc nét, ngọc ngâm nhựa ánh đục như sáp.",
      "Chạm vào da — ngọc thật mát lâu do dẫn nhiệt tốt.",
      "Đối chiếu sản phẩm với chứng thư kiểm định đi kèm.",
    ],
  },
  {
    id: "vi-sao-kiem-dinh",
    heading: "Vì sao kiểm định quan trọng?",
    body: [
      "Mắt thường không thể kết luận chắc chắn một viên ngọc là Type A — chỉ thiết bị quang phổ tại phòng kiểm định mới xác định được dấu vết nhựa polymer hay thuốc nhuộm.",
      "Vì vậy MJADE cam kết mọi sản phẩm đều đi kèm chứng thư kiểm định, và khuyến khích khách hàng kiểm định lại độc lập. Nếu kết quả không đúng cam kết, MJADE hoàn tiền 100%.",
    ],
  },
  {
    id: "bao-quan",
    heading: "Cách bảo quản ngọc",
    body: [
      "Tránh va đập mạnh và hóa chất tẩy rửa; lau bằng vải mềm ẩm sau khi đeo; cất riêng trong hộp lót vải. Chi tiết đầy đủ có trong Cẩm nang ngọc của MJADE.",
    ],
  },
];

/** Ý nghĩa tinh thần — trình bày như giá trị văn hóa, không phải công dụng đã chứng minh */
export const culturalNote = {
  heading: "Về ý nghĩa tinh thần của ngọc",
  body: [
    "Trong văn hóa Á Đông, ngọc phỉ thúy gắn với niềm tin về bình an, phẩm hạnh và sự gắn bó giữa món trang sức với chủ nhân. MJADE trân trọng những ý nghĩa này như một phần di sản văn hóa và giá trị cảm xúc của mỗi món ngọc — chúng thuộc về niềm tin cá nhân, không phải công dụng vật lý đã được khoa học chứng minh.",
  ],
};
