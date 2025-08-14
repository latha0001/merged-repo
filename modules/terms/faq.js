document.addEventListener('DOMContentLoaded', () => {
    const faqListContainer = document.querySelector('.faq-list');



    async function loadFAQs() {
        try {
            const response = await fetch(data.json)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const faqs = await response.json();

            faqListContainer.innerHTML = '';

            faqs.forEach((faq, index) => {
                const faqItem = document.createElement('div');
                faqItem.classList.add('faq-item');

                const faqQuestionButton = document.createElement('button');
                faqQuestionButton.classList.add('faq-question');
                faqQuestionButton.setAttribute('aria-expanded', 'false');

                const questionHeading = document.createElement('h3');
                questionHeading.textContent = faq.question;

                const toggleIcon = document.createElement('span');
                toggleIcon.classList.add('faq-toggle-icon');
                toggleIcon.textContent = '+';

                faqQuestionButton.appendChild(questionHeading);
                faqQuestionButton.appendChild(toggleIcon);

                const faqAnswerDiv = document.createElement('div');
                faqAnswerDiv.classList.add('faq-answer');
                faqAnswerDiv.innerHTML = `<p>${faq.answer}</p>`;
                faqAnswerDiv.style.maxHeight = '0';
                faqAnswerDiv.setAttribute('aria-hidden', 'true');

                faqItem.appendChild(faqQuestionButton);
                faqItem.appendChild(faqAnswerDiv);
                faqListContainer.appendChild(faqItem);

                faqQuestionButton.addEventListener('click', () => {
                    const isOpen = faqQuestionButton.getAttribute('aria-expanded') === 'true';

                    document.querySelectorAll('.faq-item .faq-question[aria-expanded="true"]').forEach(openButton => {
                        if (openButton !== faqQuestionButton) {
                            openButton.setAttribute('aria-expanded', 'false');
                            openButton.nextElementSibling.style.maxHeight = '0';
                            openButton.nextElementSibling.setAttribute('aria-hidden', 'true');
                            openButton.querySelector('.faq-toggle-icon').textContent = '+';
                            openButton.classList.remove('active');
                        }
                    });

                    if (isOpen) {
                        faqQuestionButton.setAttribute('aria-expanded', 'false');
                        faqAnswerDiv.style.maxHeight = '0';
                        faqAnswerDiv.setAttribute('aria-hidden', 'true');
                        toggleIcon.textContent = '+';
                        faqQuestionButton.classList.remove('active');
                    } else {
                        faqQuestionButton.setAttribute('aria-expanded', 'true');
                        faqAnswerDiv.style.maxHeight = faqAnswerDiv.scrollHeight + 'px';
                        faqAnswerDiv.setAttribute('aria-hidden', 'false');
                        toggleIcon.textContent = '-';
                        faqQuestionButton.classList.add('active');
                    }
                });
            });

        } catch (error) {
            faqListContainer.innerHTML = '<p>Failed to load FAQs. Please try again later.</p>';
        }
    }

    loadFAQs();
});