// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // 방법 1: EmailJS 사용 (권장)
        // EmailJS 설정이 되어 있다면 아래 주석을 해제하세요
        /*
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(() => {
                showMessage('메시지가 성공적으로 전송되었습니다!', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                showMessage('전송 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
                console.error('EmailJS Error:', error);
            });
        */

        // 방법 2: mailto: 링크 사용 (간단하지만 제한적) - 현재 비활성화
        // const mailtoLink = `mailto:bkk0322@naver.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`이름: ${formData.name}\n이메일: ${formData.email}\n\n메시지:\n${formData.message}`)}`;
        // window.location.href = mailtoLink;
        
        // 방법 3: Formspree 사용 (권장)
        // ⚠️ Formspree Form ID를 입력해야 합니다!
        // 1. https://formspree.io 에서 가입 및 Form 생성
        // 2. Form ID를 복사하여 아래 YOUR_FORM_ID 부분에 입력하세요
        // 3. Formspree 대시보드에서 이메일 주소(bkk0322@naver.com) 설정
        
        // Formspree Form ID를 여기에 입력하세요 (예: 'xrgkqjpn')
        const formspreeFormId = 'meovqdnp';
        
        if (!formspreeFormId || formspreeFormId === 'YOUR_FORM_ID') {
            // Form ID가 설정되지 않았을 때 안내 메시지
            showMessage('연락 폼이 아직 설정되지 않았습니다. Formspree Form ID를 입력해주세요.', 'error');
            return;
        }
        
        fetch(`https://formspree.io/f/${formspreeFormId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('전송 실패');
        })
        .then(data => {
            showMessage('메시지가 성공적으로 전송되었습니다!', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showMessage('전송 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
            console.error('Formspree Error:', error);
        });
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

