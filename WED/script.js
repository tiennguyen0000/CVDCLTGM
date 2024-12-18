document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const uploadedImage = document.getElementById('uploaded-image');
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = 'block';
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('generate').addEventListener('click', function() {
    const textInput = document.getElementById('text-input').value;

    // Gọi API để sinh ảnh từ văn bản
    console.log("Sinh ảnh từ văn bản:", textInput);
    
    // Gửi yêu cầu POST đến server Flask thông qua ngrok
    fetch('http://xyz.ngrok.io/generate-image', {  // Thay bằng URL của ngrok
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: textInput })
    })
    .then(response => response.json())
    .then(data => {
        const generatedImage = document.getElementById('generated-image');
        generatedImage.src = data.image_url;  // Dùng URL hình ảnh trả về từ API
        generatedImage.style.display = 'block';
    })
    .catch(error => console.error('Có lỗi xảy ra:', error));
});


// Xử lý nút tăng (cộng)
document.getElementById('increase').addEventListener('click', function() {
    const modifierInput = document.getElementById('text-modifier');
    modifierInput.value += '+'; // Thêm ký tự '+' vào ô nhập
});

// Xử lý nút giảm (trừ)
document.getElementById('decrease').addEventListener('click', function() {
    const modifierInput = document.getElementById('text-modifier');
    modifierInput.value += '-'; // Thêm ký tự '-' vào ô nhập
});

// Đặt lại hình ảnh và các trường
document.getElementById('reset').addEventListener('click', function() {
    const uploadedImage = document.getElementById('uploaded-image');
    const generatedImage = document.getElementById('generated-image');
    
    uploadedImage.style.display = 'none';
    uploadedImage.src = '';
    
    generatedImage.style.display = 'none';
    generatedImage.src = '';

    document.getElementById('text-input').value = ''; // Xóa nội dung văn bản
});

// Đặt lại ảnh sinh ra về trạng thái ban đầu
document.getElementById('reset-image').addEventListener('click', function() {
    const generatedImage = document.getElementById('generated-image');
    generatedImage.src = ''; // Xóa nguồn hình ảnh
    generatedImage.style.display = 'none'; // Ẩn hình ảnh

    // Xóa nội dung ô nhập văn bản
    document.getElementById('text-modifier').value = '';
});
