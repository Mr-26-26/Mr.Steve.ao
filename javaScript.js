
                        (function(){
                            var details = {
                                tecnica: 'Tradução técnica: terminologia especializada, glossário e revisão. Preço estimado: depende da complexidade e do domínio.',
                                juridica: 'Tradução jurídica: precisão terminológica, confidencialidade e possível notarização. Preço estimado: por página ou por palavra.',
                                literaria: 'Tradução literária: adaptação estilística e preservação de voz do autor. Preço estimado: depende do projeto.',
                                marketing: 'Marketing: localização para público alvo, adaptação de tom e chamada para ação. Preço estimado: por palavra / projeto.',
                                tecnica2: 'Técnica especializada: manuais, patentes, documentação técnica com revisão por especialista. Preço estimado: sujeito a consulta.',
                                simultanea: 'Simultânea: interpretação ao vivo para eventos, reuniões ou sessões. Preço estimado: por hora e por equipamento/viagem.'
                            };

                            var radios = Array.from(document.querySelectorAll('input[name="translationOption"]'));
                            var detailsEl = document.getElementById('transDetails');
                            var selectedKey = null;

                            radios.forEach(function(r){
                                r.addEventListener('change', function(){
                                    selectedKey = r.value;
                                    detailsEl.textContent = details[selectedKey] || 'Descrição não disponível.';
                                });
                            });

                            document.getElementById('transRequestBtn').addEventListener('click', function(){
                                if(!selectedKey){
                                    alert('Por favor selecione um tipo de tradução primeiro.');
                                    return;
                                }
                                var text = [
                                    'Olá, gostaria de um orçamento para:',
                                    '',
                                    'Tipo: ' + (selectedKey || ''),
                                    'Detalhes: ',
                                    ''
                                ].join('\n');
                                window.open('https://wa.me/244957668814?text=' + encodeURIComponent(text), '_blank', 'noopener');
                            });

                            document.getElementById('transMoreBtn').addEventListener('click', function(){
                                if(!selectedKey){
                                    alert('Por favor selecione um tipo de tradução para ver mais detalhes.');
                                    return;
                                }
                                alert(details[selectedKey]);
                            });
                        })();

                (function(){
                    var track = document.getElementById('bioCarousel');
                    if(!track) return;

                    var index = 0;
                    // groups: number of distinct pages (4 items per page)
                    var groups = 4; // 8 items / 4 per view = 2 pages (desktop)
                    var intervalMs = 6000;
                    var timer = null;

                    function goTo(i){
                        // on narrow screens the track width and offsets differ:
                        var narrow = window.matchMedia('(max-width:700px)').matches;
                        if(narrow){
                            // each page shift = 50% (showing 2 per view), total pages = 4
                            var pages = 4;
                            i = i % pages;
                            track.style.transform = 'translateX(' + (-i * 25) + '%)'; // because track width is 400%, move by 25% steps
                        } else {
                            // desktop: two pages (0 and 1), move by 50%
                            track.style.transform = 'translateX(' + (-i * 50) + '%)';
                        }
                    }

                    function start(){
                        stop();
                        timer = setInterval(function(){
                            var narrow = window.matchMedia('(max-width:700px)').matches;
                            if(narrow){
                                // on narrow screens cycle through 4 pages (8 items / 2 per view)
                                index = (index + 1) % 4;
                            } else {
                                index = (index + 1) % groups;
                            }
                            goTo(index);
                        }, intervalMs);
                    }

                    function stop(){ if(timer) { clearInterval(timer); timer = null; } }

                    // pause on hover / focus for accessibility
                    var container = track.parentElement;
                    container.addEventListener('mouseenter', stop);
                    container.addEventListener('mouseleave', start);
                    container.addEventListener('focusin', stop);
                    container.addEventListener('focusout', start);

                    // restart when resizing to recalc behavior
                    window.addEventListener('resize', function(){
                        // recalc index to keep a valid page when layout changes
                        index = 0;
                        goTo(index);
                    });

                    // init
                    goTo(0);
                    start();
                })();

        // número WhatsApp (formato internacional sem +)
        const WA_NUMBER = '244957668814';

        function sanitize(str){
            return (str||'').replace(/\r\n|\r|\n/g, ' ');
        }

        function serviceLabel(val){
            switch(val){
                case 'espiritual': return 'Consultoria espiritual';
                case 'aconselhamento': return 'Aconselhamento';
                case 'privado': return 'Serviço íntimo (privado)';
                case 'traducao': return 'Tradução';
                default: return val;
            }
        }

        function handleSubmit(e){
            e.preventDefault();
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var type = document.getElementById('serviceType').value;
            var lang = document.getElementById('lang').value;
            var message = document.getElementById('message').value.trim();
            var consent = document.getElementById('consent').checked;
            if(!consent){ alert('É necessário confirmar que é maior de idade.'); return; }

            var lines = [];
            lines.push('Pedido de Agendamento - MR Steve Consultoria');
            lines.push('');
            lines.push('Nome: ' + name);
            lines.push('Email: ' + email);
            lines.push('Tipo: ' + serviceLabel(type));
            lines.push('Idioma: ' + lang);
            lines.push('');
            lines.push('Mensagem: ' + sanitize(message));

            var text = encodeURIComponent(lines.join('\n'));
            var url = 'https://wa.me/' + WA_NUMBER + '?text=' + text;
            window.open(url, '_blank', 'noopener');
        }

        function openWhatsAppQuick(){
            var quickText = [
                'Olá, gostaria de informações sobre serviços na MR Steve Consultoria.',
                '',
                'Nome: ',
                'Serviço: ',
                'Detalhes: '
            ].join('\n');
            var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(quickText);
            window.open(url, '_blank', 'noopener');
        }

        // ===== Preçario (PDF) upload handling =====
        function handlePrecoUpload(event){
            var file = event.target.files && event.target.files[0];
            if(!file) return;
            if(file.type !== 'application/pdf'){
                alert('Por favor selecione um ficheiro PDF.');
                event.target.value = '';
                return;
            }
            // liberar objectURL anterior se existir
            if(window._precoObjectURL) URL.revokeObjectURL(window._precoObjectURL);
            var url = URL.createObjectURL(file);
            window._precoObjectURL = url;

            // atualizar link principal
            var link = document.getElementById('precoLink');
            if(link){
                link.href = url;
                link.download = file.name;
                link.style.pointerEvents = 'auto';
                link.style.opacity = '1';
            }

            document.getElementById('precoStatus').textContent = 'Ficheiro: ' + file.name;
            document.getElementById('precoReset').style.display = 'inline-block';

            var iframe = document.getElementById('precoIframe');
            iframe.src = url;
            document.getElementById('precoPreview').style.display = 'block';

            // esconder tabela de preços por defeito
            var table = document.getElementById('precoTable');
            if(table) table.style.display = 'none';
        }

        function resetPreco(){
            var input = document.getElementById('precoFile');
            input.value = '';
            var link = document.getElementById('precoLink');
            if(link){
                link.href = '#';
                link.style.pointerEvents = 'none';
                link.style.opacity = '0.6';
            }
            document.getElementById('precoStatus').textContent = 'Tabela de preços visível.';
            document.getElementById('precoReset').style.display = 'none';
            document.getElementById('precoPreview').style.display = 'none';
            var iframe = document.getElementById('precoIframe');
            iframe.src = '';
            if(window._precoObjectURL){ URL.revokeObjectURL(window._precoObjectURL); window._precoObjectURL = null; }

            // mostrar tabela de preços por defeito novamente
            var table = document.getElementById('precoTable');
            if(table) table.style.display = 'block';
        }
        