import React, { useState, useEffect } from 'react';
import UploadFile from './components/UploadFile';
import ListFiles from './components/ListFiles';
import FeedbackForm from './components/FeedbackForm';
import PrayerRequestForm from './components/PrayerRequestForm';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Joyride, { STATUS } from 'react-joyride';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Set a global timeout for axios requests to prevent hanging
axios.defaults.timeout = 10000; // 10-second timeout

// Debounce hook to prevent excessive updates
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// Initialize i18next for multi-language support
i18next
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "title": "Pastor Billy Philips' Sermon Dashboard",
                    "uploadTab": "Upload",
                    "viewTab": "View Sermons",
                    "generateTab": "Generate Content",
                    "liveTab": "Live Converter",
                    "decreesTab": "Decrees",
                    "scheduleTab": "Schedule",
                    "analyticsTab": "Analytics",
                    "scriptureTab": "Scripture Lookup",
                    "feedbackTab": "Feedback Form",
                    "prayerTab": "Prayer Requests",
                    "uploadSection": "Upload Sermons",
                    "viewSection": "View Sermons",
                    "generateSection": "Generate Content (Ctrl+G for Social Posts)",
                    "liveSection": "Live Sermon Converter",
                    "decreesSection": "Decrees (Ctrl+D to Generate)",
                    "scheduleSection": "Schedule Posts",
                    "analyticsSection": "Analytics Dashboard",
                    "scriptureSection": "Scripture Lookup",
                    "feedbackSection": "Feedback Analytics",
                    "prayerSection": "Prayer Requests",
                    "darkMode": "Dark Mode",
                    "lightMode": "Light Mode",
                    "online": "Online",
                    "offline": "Offline",
                    "convertSermon": "Convert Sermon",
                    "generateSocialPosts": "Generate Social Posts",
                    "previewPosts": "Preview Posts",
                    "generatePrayer": "Generate Prayer",
                    "generateDevotional": "Generate Devotional",
                    "generateEbook": "Generate Ebook",
                    "generateLyrics": "Generate Lyrics",
                    "findQuotes": "Find Quotes",
                    "exportPDF": "Export PDF",
                    "clearStyle": "Clear Style",
                    "saveDecree": "Save Decree",
                    "generateDecree": "Generate Decree",
                    "scheduleX": "Schedule X",
                    "scheduleFB": "Schedule FB",
                    "scheduleIG": "Schedule IG",
                    "analyzeSermon": "Analyze Selected Sermon",
                    "fetchScripture": "Fetch Scripture",
                    "insertSermon": "Insert into Sermon",
                    "insertDecree": "Insert into Decree",
                    "addTheme": "Add Theme",
                    "copy": "Copy",
                    "close": "Close",
                    "output": "Output",
                    "noOutput": "Click a button to generate content",
                    "savedDecrees": "Saved Decrees",
                    "noDecrees": "No decrees saved yet.",
                    "scheduledPosts": "Scheduled Posts",
                    "noScheduledPosts": "No posts scheduled.",
                    "sermonInsights": "Sermon Insights",
                    "topThemes": "Top Themes",
                    "scriptures": "Scriptures",
                    "ministryActivity": "Ministry Activity Overview",
                    "uploads": "Uploads",
                    "socialPosts": "Social Posts",
                    "conversions": "Conversions",
                    "decrees": "Decrees",
                    "feedback": "Feedback",
                    "prayerRequests": "Prayer Requests",
                    "commonThemes": "Common Themes in Feedback",
                    "averageRating": "Average Rating",
                    "numberComments": "Number of Comments",
                    "recentComments": "Recent Comments",
                    "manageTemplates": "Manage Social Post Templates",
                    "platform": "Platform",
                    "templateName": "Template Name",
                    "templateContent": "Template Content (use {text} for sermon text)",
                    "saveTemplate": "Save Template",
                    "selectTemplate": "Select Template",
                    "deleteTemplate": "Delete Template",
                    "noTemplates": "No templates saved yet.",
                    "backup": "Create Backup",
                    "restore": "Restore from Backup",
                    "selectBackup": "Select Backup",
                    "noBackups": "No backups available.",
                    "pending": "Pending",
                    "prayed": "Prayed",
                    "updateStatus": "Update Status"
                }
            },
            es: {
                translation: {
                    "title": "Tablero de Sermones del Pastor Billy Philips",
                    "uploadTab": "Subir",
                    "viewTab": "Ver Sermones",
                    "generateTab": "Generar Contenido",
                    "liveTab": "Convertidor en Vivo",
                    "decreesTab": "Decretos",
                    "scheduleTab": "Programar",
                    "analyticsTab": "Analíticas",
                    "scriptureTab": "Búsqueda de Escrituras",
                    "feedbackTab": "Formulario de Retroalimentación",
                    "prayerTab": "Solicitudes de Oración",
                    "uploadSection": "Subir Sermones",
                    "viewSection": "Ver Sermones",
                    "generateSection": "Generar Contenido (Ctrl+G para Publicaciones Sociales)",
                    "liveSection": "Convertidor de Sermones en Vivo",
                    "decreesSection": "Decretos (Ctrl+D para Generar)",
                    "scheduleSection": "Programar Publicaciones",
                    "analyticsSection": "Tablero de Analíticas",
                    "scriptureSection": "Búsqueda de Escrituras",
                    "feedbackSection": "Analíticas de Retroalimentación",
                    "prayerSection": "Solicitudes de Oración",
                    "darkMode": "Modo Oscuro",
                    "lightMode": "Modo Claro",
                    "online": "En línea",
                    "offline": "Sin conexión",
                    "convertSermon": "Convertir Sermón",
                    "generateSocialPosts": "Generar Publicaciones Sociales",
                    "previewPosts": "Vista Previa de Publicaciones",
                    "generatePrayer": "Generar Oración",
                    "generateDevotional": "Generar Devocional",
                    "generateEbook": "Generar Ebook",
                    "generateLyrics": "Generar Letras",
                    "findQuotes": "Buscar Citas",
                    "exportPDF": "Exportar PDF",
                    "clearStyle": "Borrar Estilo",
                    "saveDecree": "Guardar Decreto",
                    "generateDecree": "Generar Decreto",
                    "scheduleX": "Programar X",
                    "scheduleFB": "Programar FB",
                    "scheduleIG": "Programar IG",
                    "analyzeSermon": "Analizar Sermón Seleccionado",
                    "fetchScripture": "Obtener Escritura",
                    "insertSermon": "Insertar en Sermón",
                    "insertDecree": "Insertar en Decreto",
                    "addTheme": "Agregar Tema",
                    "copy": "Copiar",
                    "close": "Cerrar",
                    "output": "Salida",
                    "noOutput": "Haz clic en un botón para generar contenido",
                    "savedDecrees": "Decretos Guardados",
                    "noDecrees": "Aún no hay decretos guardados.",
                    "scheduledPosts": "Publicaciones Programadas",
                    "noScheduledPosts": "No hay publicaciones programadas.",
                    "sermonInsights": "Perspectivas del Sermón",
                    "topThemes": "Temas Principales",
                    "scriptures": "Escrituras",
                    "ministryActivity": "Resumen de Actividad del Ministerio",
                    "uploads": "Subidas",
                    "socialPosts": "Publicaciones Sociales",
                    "conversions": "Conversiones",
                    "decrees": "Decretos",
                    "feedback": "Retroalimentación",
                    "prayerRequests": "Solicitudes de Oración",
                    "commonThemes": "Temas Comunes en Retroalimentación",
                    "averageRating": "Calificación Promedio",
                    "numberComments": "Número de Comentarios",
                    "recentComments": "Comentarios Recientes",
                    "manageTemplates": "Administrar Plantillas de Publicaciones Sociales",
                    "platform": "Plataforma",
                    "templateName": "Nombre de la Plantilla",
                    "templateContent": "Contenido de la Plantilla (usa {text} para el texto del sermón)",
                    "saveTemplate": "Guardar Plantilla",
                    "selectTemplate": "Seleccionar Plantilla",
                    "deleteTemplate": "Eliminar Plantilla",
                    "noTemplates": "Aún no hay plantillas guardadas.",
                    "backup": "Crear Respaldo",
                    "restore": "Restaurar desde Respaldo",
                    "selectBackup": "Seleccionar Respaldo",
                    "noBackups": "No hay respaldos disponibles.",
                    "pending": "Pendiente",
                    "prayed": "Orado",
                    "updateStatus": "Actualizar Estado"
                }
            }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    });

function App() {
    const { t, i18n } = useTranslation();
    const [output, setOutput] = useState('');
    const [liveSermonText, setLiveSermonText] = useState('');
    const [rawLiveSermonText, setRawLiveSermonText] = useState('');
    const [liveConverted, setLiveConverted] = useState('');
    const [transcripts, setTranscripts] = useState([]);
    const [sermonText, setSermonText] = useState('');
    const [selectedTranscript, setSelectedTranscript] = useState('');
    const [socialPosts, setSocialPosts] = useState({ xPost: '', fbPost: '', igPost: '' });
    const [uploadStatus, setUploadStatus] = useState({});
    const [selectedTheme, setSelectedTheme] = useState('All');
    const [activeTab, setActiveTab] = useState('upload');
    const [toast, setToast] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [analytics, setAnalytics] = useState({ uploads: 0, posts: 0, conversions: 0, decrees: 0, feedback: 0, prayerRequests: 0 });
    const [darkMode, setDarkMode] = useState(false);
    const [customThemes, setCustomThemes] = useState([]);
    const [styleName, setStyleName] = useState('Bold Decree');
    const [decrees, setDecrees] = useState([]);
    const [decreeInput, setDecreeInput] = useState('');
    const [scheduledPosts, setScheduledPosts] = useState([]);
    const [insights, setInsights] = useState({ themes: [], scriptures: [] });
    const [feedbackData, setFeedbackData] = useState([]);
    const [feedbackAnalytics, setFeedbackAnalytics] = useState({});
    const [prayerRequests, setPrayerRequests] = useState([]);
    const [socialTemplates, setSocialTemplates] = useState({ 'X': [], 'Facebook': [], 'Instagram': [] });
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [templatePlatform, setTemplatePlatform] = useState('X');
    const [backups, setBackups] = useState([]);
    const [selectedBackup, setSelectedBackup] = useState('');
    const [loading, setLoading] = useState(false);
    const [runTour, setRunTour] = useState(false);
    const [scriptureQuery, setScriptureQuery] = useState('');
    const [scriptureResult, setScriptureResult] = useState('');
    const [styleExamples, setStyleExamples] = useState({ 'Bold Decree': [], 'Gentle Grace': [] });
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const debouncedLiveSermonText = useDebounce(rawLiveSermonText, 500);

    useEffect(() => {
        setLiveSermonText(debouncedLiveSermonText);
        handleLiveConvert(debouncedLiveSermonText);
    }, [debouncedLiveSermonText]);

    const tourSteps = [
        { target: '.upload-tab', content: t('uploadTab') + ': ' + t('uploadSection') },
        { target: '.view-tab', content: t('viewTab') + ': ' + t('viewSection') },
        { target: '.generate-tab', content: t('generateTab') + ': ' + t('generateSection') },
        { target: '.live-tab', content: t('liveTab') + ': ' + t('liveSection') },
        { target: '.decrees-tab', content: t('decreesTab') + ': ' + t('decreesSection') },
        { target: '.schedule-tab', content: t('scheduleTab') + ': ' + t('scheduleSection') },
        { target: '.analytics-tab', content: t('analyticsTab') + ': ' + t('analyticsSection') },
        { target: '.scripture-tab', content: t('scriptureTab') + ': ' + t('scriptureSection') },
        { target: '.prayer-tab', content: t('prayerTab') + ': ' + t('prayerSection') },
    ];

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenTour');
        if (!hasSeenTour) {
            setRunTour(true);
            localStorage.setItem('hasSeenTour', 'true');
        }

        fetchTranscripts();
        fetchAnalytics();
        fetchDecrees();
        fetchScheduledPosts();
        fetchStyleExamples();
        fetchFeedback();
        fetchPrayerRequests();
        fetchSocialTemplates();
        fetchBackups();
        const savedText = localStorage.getItem('liveSermonText');
        if (savedText) {
            setRawLiveSermonText(savedText);
            setLiveSermonText(savedText);
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(reg => console.log('Service Worker registered', reg))
                .catch(err => console.error('Service Worker registration failed', err));
        }

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (liveSermonText) {
                localStorage.setItem('liveSermonText', liveSermonText);
            }
        }, 10000);
        return () => clearInterval(interval);
    }, [liveSermonText]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey) {
                if (e.key === 'g' && activeTab === 'generate') {
                    e.preventDefault();
                    generateSocialPosts();
                } else if (e.key === 'd' && activeTab === 'decrees') {
                    e.preventDefault();
                    generateDecree();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeTab, sermonText, decreeInput, selectedTranscript]);

    const fetchStyleExamples = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/files`);
            setStyleExamples(response.data);
            localStorage.setItem('styleExamples', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching style examples:', error);
            const cachedStyles = localStorage.getItem('styleExamples');
            if (cachedStyles) {
                setStyleExamples(JSON.parse(cachedStyles));
            }
        }
    };

    const fetchTranscripts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/files');
            const transcriptFiles = response.data.filter(file => file.key.startsWith('transcripts/'));
            setTranscripts(transcriptFiles);
        } catch (error) {
            showToast(`Error fetching transcripts: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/analytics');
            setAnalytics(response.data);
        } catch (error) {
            showToast(`Error fetching analytics: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchDecrees = async () => {
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/decrees');
            setDecrees(response.data);
        } catch (error) {
            showToast(`Error fetching decrees: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchScheduledPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/scheduled-posts');
            setScheduledPosts(response.data);
        } catch (error) {
            showToast(`Error fetching scheduled posts: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchFeedback = async () => {
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/feedback');
            setFeedbackData(response.data);
            analyzeFeedback(response.data);
        } catch (error) {
            showToast(`Error fetching feedback: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchPrayerRequests = async () => {
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/prayer-requests');
            setPrayerRequests(response.data);
        } catch (error) {
            showToast(`Error fetching prayer requests: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchSocialTemplates = async () => {
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/templates');
            setSocialTemplates(response.data);
        } catch (error) {
            showToast(`Error fetching templates: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchBackups = async () => {
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/backups');
            setBackups(response.data);
        } catch (error) {
            showToast(`Error fetching backups: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const analyzeFeedback = (feedback) => {
        const sermonFeedback = {};
        const commonThemes = {};

        feedback.forEach(fb => {
            if (!sermonFeedback[fb.sermonKey]) {
                sermonFeedback[fb.sermonKey] = { ratings: [], comments: [] };
            }
            sermonFeedback[fb.sermonKey].ratings.push(fb.rating);
            sermonFeedback[fb.sermonKey].comments.push(fb.comment);

            const comment = fb.comment.toLowerCase();
            const themes = {
                inspiring: comment.includes('inspiring') || comment.includes('uplifting'),
                challenging: comment.includes('challenging') || comment.includes('difficult'),
                encouraging: comment.includes('encouraging') || comment.includes('motivating'),
                unclear: comment.includes('unclear') || comment.includes('confusing')
            };
            Object.keys(themes).forEach(theme => {
                if (themes[theme]) {
                    commonThemes[theme] = (commonThemes[theme] || 0) + 1;
                }
            });
        });

        const feedbackAnalytics = {};
        Object.keys(sermonFeedback).forEach(sermonKey => {
            const ratings = sermonFeedback[sermonKey].ratings;
            const averageRating = ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
            feedbackAnalytics[sermonKey] = {
                averageRating,
                commentCount: sermonFeedback[sermonKey].comments.length,
                comments: sermonFeedback[sermonKey].comments
            };
        });

        setFeedbackAnalytics({ sermons: feedbackAnalytics, themes: commonThemes });
    };

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(''), 3000);
    };

    const checkTranscriptionStatus = async (jobName) => {
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/transcription-status', { params: { jobName } });
            return response.data.status;
        } catch (error) {
            showToast(`Error checking transcription status: ${error.message}`);
            return 'FAILED';
        } finally {
            setLoading(false);
        }
    };

    const handleUploadSuccess = async (jobName) => {
        setUploadStatus(prev => ({ ...prev, [jobName]: 'Processing' }));
        showToast('Upload started!');
        const interval = setInterval(async () => {
            const status = await checkTranscriptionStatus(jobName);
            setUploadStatus(prev => ({ ...prev, [jobName]: status }));
            if (status === 'COMPLETED') {
                showToast('Transcription completed!');
                fetchTranscripts();
                fetchAnalytics();
                clearInterval(interval);
            } else if (status === 'FAILED') {
                showToast('Transcription failed.');
                clearInterval(interval);
            }
        }, 5000);
    };

    const generatePost = async () => {
        if (!sermonText) return setOutput('Enter sermon text');
        setLoading(true);
        try {
            const response = await axios.post('${process.env.REACT_APP_API_URL}/generate-post', { sermonText });
            setOutput(response.data.post);
            showToast('Post generated!');
            fetchAnalytics();
        } catch (error) {
            showToast(`Error generating post: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const generateLyrics = async () => {
        const theme = document.getElementById('lyricsTheme')?.value;
        if (!theme) return setOutput('Enter a theme');
        setLoading(true);
        try {
            const response = await axios.post('${process.env.REACT_APP_API_URL}/generate-lyrics', { theme });
            setOutput(response.data.lyrics);
            showToast('Lyrics generated!');
        } catch (error) {
            showToast(`Error generating lyrics: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const findQuotes = async () => {
        const topic = document.getElementById('quotesTopic')?.value;
        if (!topic) return setOutput('Enter a topic');
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/quotes', { params: { topic } });
            setOutput(`Bible Quote: ${response.data.bibleQuote}\nLeader Quote: ${response.data.leaderQuote}`);
            showToast('Quotes found!');
        } catch (error) {
            showToast(`Error finding quotes: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const generateDevotional = async () => {
        if (!sermonText) return setOutput('Enter sermon text');
        setLoading(true);
        try {
            const response = await axios.post('${process.env.REACT_APP_API_URL}/generate-devotional', { sermonText });
            setOutput(response.data.devotional);
            showToast('Devotional generated!');
        } catch (error) {
            showToast(`Error generating devotional: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const generateEbook = async () => {
        const title = document.getElementById('ebookTitle')?.value;
        if (!sermonText) return setOutput('Enter sermon text');
        setLoading(true);
        try {
            const response = await axios.post('${process.env.REACT_APP_API_URL}/generate-ebook', { sermonText, title });
            setOutput(response.data.ebook);
            showToast('Ebook generated!');
        } catch (error) {
            showToast(`Error generating ebook: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const convertSermon = async () => {
        if (!sermonText) return setOutput('Enter sermon text');
        setLoading(true);
        try {
            const response = await axios.post('http://loca${process.env.REACT_APP_API_URL}lhost:5000/convert-sermon', { sermonText, styleName });
            setOutput(response.data.converted);
            if (window.confirm('Save this as an example of your style?')) {
                await axios.post('http://local${process.env.REACT_APP_API_URL}host:5000/save-style', { sermonText, converted: response.data.converted, styleName });
                setOutput(prev => prev + '\nStyle saved!');
                showToast('Style saved!');
                fetchStyleExamples();
            } else {
                showToast('Sermon converted!');
            }
            fetchAnalytics();
        } catch (error) {
            showToast(`Error converting sermon: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const convertSermonOffline = (text, styleName) => {
        let scripture = 'Ephesians 3:20 (NKJV) - Now to Him who is able...';
        let decreeBase = 'I stand bold in faith';
        let extraFlair = ' Saints, stand up!';

        const examples = styleExamples[styleName] || [];
        const combinedExamples = examples.map(e => e.converted);
        if (combinedExamples.some(e => e.includes('I decree'))) decreeBase = 'I decree and declare';
        if (combinedExamples.some(e => e.includes('Romans'))) scripture = 'Romans 8:28 (NKJV) - And we know...';
        if (combinedExamples.some(e => e.includes('rise up'))) extraFlair = ' Saints, rise up!';

        return styleName === 'Gentle Grace' ? `
        **Converted Sermon in Gentle Grace Style (Offline)**
        *Scripture:* ${scripture}

        Beloved, ${text.substring(0, 100)}... Let’s rest in this truth: God’s grace is sufficient. Quietly now, ${text.split(' ')[0]} becomes our strength. He lifts us gently into His peace.
        ` : `
        **Converted Sermon in Bold Decree Style (Offline)**
        *Scripture:* ${scripture}

        Saints, hear this! ${text.substring(0, 100)}... This ain’t just words—it’s POWER! ${text.split(' ')[0]} is your starting point, but God’s got MORE!${extraFlair}
        *Decree:* ${decreeBase}—${text.split('.')[0]}—in Jesus’ name!
        `;
    };

    const clearStyle = async () => {
        if (window.confirm(`Clear all saved examples for ${styleName}?`)) {
            setLoading(true);
            try {
                await axios.post('http:/${process.env.REACT_APP_API_URL}/localhost:5000/clear-style', { styleName });
                setOutput('Style memory cleared!');
                showToast('Style cleared!');
                fetchStyleExamples();
            } catch (error) {
                showToast(`Error clearing style: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }
    };

    const exportToPDF = async () => {
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/export-pdf', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Pastor_Billy_Sermons.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setOutput('PDF exported successfully!');
            showToast('PDF exported!');
        } catch (error) {
            showToast(`Error exporting PDF: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const generatePrayer = async () => {
        if (!sermonText) return setOutput('Enter sermon text');
        setLoading(true);
        try {
            const response = await axios.post('${process.env.REACT_APP_API_URL}/generate-prayer', { sermonText });
            setOutput(response.data.prayer);
            showToast('Prayer generated!');
        } catch (error) {
            showToast(`Error generating prayer: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const generateSocialPosts = async () => {
        const transcriptKey = selectedTranscript || null;
        if (!sermonText && !transcriptKey) return setOutput('Enter sermon text or select a transcript');
        setLoading(true);
        try {
            const response = await axios.post('${process.env.REACT_APP_API_URL}/generate-social-posts', { 
                sermonText, 
                transcriptKey, 
                templateName: selectedTemplate, 
                platform: templatePlatform 
            });
            setSocialPosts({
                xPost: response.data.xPost,
                fbPost: response.data.fbPost,
                igPost: response.data.igPost
            });
            setOutput('Social posts generated!');
            showToast('Social posts generated!');
            fetchAnalytics();
        } catch (error) {
            showToast(`Error generating social posts: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const saveTemplate = async () => {
        const name = document.getElementById('templateName')?.value;
        const template = document.getElementById('templateContent')?.value;
        if (!name || !template) return showToast('Enter template name and content!');
        setLoading(true);
        try {
            await axios.post('${process.env.REACT_APP_API_URL}/save-template', { platform: templatePlatform, name, template });
            fetchSocialTemplates();
            showToast('Template saved!');
        } catch (error) {
            showToast(`Error saving template: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteTemplate = async (name) => {
        setLoading(true);
        try {
            await axios.post('${process.env.REACT_APP_API_URL}/delete-template', { platform: templatePlatform, name });
            fetchSocialTemplates();
            showToast('Template deleted!');
        } catch (error) {
            showToast(`Error deleting template: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setOutput('Copied to clipboard!');
        showToast('Copied to clipboard!');
    };

    const handleLiveConvert = async (text) => {
        if (text.trim()) {
            setLoading(true);
            try {
                if (isOnline) {
                    const response = await axios.post('${process.env.REACT_APP_API_URL}/convert-sermon', { sermonText: text, styleName });
                    setLiveConverted(response.data.converted);
                } else {
                    const converted = convertSermonOffline(text, styleName);
                    setLiveConverted(converted);
                    showToast('Converted offline!');
                }
            } catch (error) {
                if (!isOnline) {
                    const converted = convertSermonOffline(text, styleName);
                    setLiveConverted(converted);
                    showToast('Converted offline!');
                } else {
                    showToast(`Error in live conversion: ${error.message}`);
                }
            } finally {
                setLoading(false);
            }
        } else {
            setLiveConverted('');
        }
    };

    const saveDecree = async () => {
        if (!decreeInput) return setOutput('Enter a decree');
        setLoading(true);
        try {
            await axios.post('${process.env.REACT_APP_API_URL}/save-decree', { decree: decreeInput });
            setDecreeInput('');
            setOutput('Decree saved!');
            showToast('Decree saved!');
            fetchDecrees();
            fetchAnalytics();
        } catch (error) {
            showToast(`Error saving decree: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const generateDecree = async () => {
        setLoading(true);
        try {
            const response = await axios.post('${process.env.REACT_APP_API_URL}/generate-decree', { input: sermonText || decreeInput });
            setOutput(response.data.decree);
            showToast('Decree generated!');
        } catch (error) {
            showToast(`Error generating decree: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const addCustomTheme = (theme) => {
        if (theme && !customThemes.includes(theme)) {
            setCustomThemes([...customThemes, theme]);
            showToast('Custom theme added!');
        }
    };

    const schedulePost = async (platform) => {
        const dateTime = document.getElementById('scheduleDateTime')?.value;
        if (!selectedTranscript || !dateTime) return showToast('Select a transcript and date!');
        setLoading(true);
        try {
            await axios.post('${process.env.REACT_APP_API_URL}/schedule-post', { transcriptKey: selectedTranscript, dateTime, platform });
            showToast(`${platform} post scheduled!`);
            fetchScheduledPosts();
        } catch (error) {
            showToast(`Error scheduling post: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const analyzeSermon = async () => {
        if (!selectedTranscript) return showToast('Select a transcript!');
        setLoading(true);
        try {
            const response = await axios.post('${process.env.REACT_APP_API_URL}/analyze-sermon', { transcriptKey: selectedTranscript });
            setInsights(response.data);
            setOutput(`Top Themes: ${response.data.themes.join(', ')}\nScriptures: ${response.data.scriptures.join(', ')}`);
            showToast('Sermon analyzed!');
        } catch (error) {
            showToast(`Error analyzing sermon: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        showToast(`Language changed to ${lang === 'en' ? 'English' : 'Spanish'}`);
    };

    const createBackup = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://l${process.env.REACT_APP_API_URL}ocalhost:5000/backup');
            showToast('Backup created!');
            fetchBackups();
        } catch (error) {
            showToast(`Error creating backup: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const restoreBackup = async () => {
        if (!selectedBackup) return showToast('Select a backup to restore!');
        setLoading(true);
        try {
            await axios.post('${process.env.REACT_APP_API_URL}/restore', { backupKey: selectedBackup });
            showToast('Backup restored!');
            fetchTranscripts();
            fetchAnalytics();
            fetchDecrees();
            fetchScheduledPosts();
            fetchFeedback();
            fetchPrayerRequests();
            fetchSocialTemplates();
            fetchStyleExamples();
        } catch (error) {
            showToast(`Error restoring backup: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const updatePrayerStatus = async (prayer, newStatus) => {
        setLoading(true);
        try {
            await axios.post('${process.env.REACT_APP_API_URL}/update-prayer-status', { 
                timestamp: prayer.timestamp, 
                name: prayer.name, 
                status: newStatus 
            });
            showToast('Prayer status updated!');
            fetchPrayerRequests();
        } catch (error) {
            showToast(`Error updating prayer status: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchScripture = async () => {
        if (!scriptureQuery) return showToast('Enter a scripture reference (e.g., John 3:16)');
        setLoading(true);
        try {
            const response = await axios.get('${process.env.REACT_APP_API_URL}/scripture', { params: { reference: scriptureQuery } });
            setScriptureResult(response.data.text);
            showToast('Scripture fetched!');
        } catch (error) {
            showToast(`Error fetching scripture: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const insertScripture = (target) => {
        if (!scriptureResult) return showToast('No scripture to insert!');
        if (target === 'sermonText') {
            setSermonText(prev => `${prev}\n${scriptureResult}`);
            setActiveTab('generate');
        } else if (target === 'decreeInput') {
            setDecreeInput(prev => `${prev}\n${scriptureResult}`);
            setActiveTab('decrees');
        }
        showToast('Scripture inserted!');
    };

    const filteredTranscripts = selectedTheme === 'All' ? transcripts : transcripts.filter(t => t.theme === selectedTheme);

    const chartData = {
        labels: [
            t('uploads'), 
            t('socialPosts'), 
            t('conversions'), 
            t('decrees'), 
            t('feedback'), 
            t('prayerRequests')
        ],
        datasets: [
            {
                label: t('ministryActivity'),
                data: [
                    analytics.uploads, 
                    analytics.posts, 
                    analytics.conversions, 
                    analytics.decrees, 
                    analytics.feedback, 
                    analytics.prayerRequests
                ],
                backgroundColor: ['#60A5FA', '#FBBF24', '#34D399', '#A78BFA', '#EF4444', '#F472B6'],
                borderColor: ['#2563EB', '#D97706', '#059669', '#7C3AED', '#DC2626', '#DB2777'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: t('ministryActivity') }
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    const feedbackChartData = {
        labels: Object.keys(feedbackAnalytics.themes || {}),
        datasets: [
            {
                label: t('commonThemes'),
                data: Object.values(feedbackAnalytics.themes || {}),
                backgroundColor: ['#60A5FA', '#FBBF24', '#34D399', '#EF4444'],
                borderColor: ['#2563EB', '#D97706', '#059669', '#DC2626'],
                borderWidth: 1,
            },
        ],
    };

    const feedbackChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: t('commonThemes') }
        },
        scales: {
            y: { beginAtZero: true },
        },
    };
    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <Joyride
                steps={tourSteps}
                run={runTour}
                continuous
                showSkipButton
                styles={{
                    options: {
                        primaryColor: '#FBBF24',
                        textColor: darkMode ? '#fff' : '#000',
                    },
                }}
                callback={(data) => {
                    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
                        setRunTour(false);
                    }
                }}
            />
            <header className="sticky top-0 bg-blue-900 dark:bg-gray-800 text-white p-4 flex items-center justify-between shadow-lg z-10 border-b-2 border-gold-400">
                <div className="flex items-center">
                    <img src="/logo.png" alt="Walk with Victory" className="w-16 h-16 mr-4 rounded-full border-2 border-gold-400 shadow-md" />
                    <h1 className="text-3xl font-bold text-gold-400">{t('title')}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                        {isOnline ? t('online') : t('offline')}
                    </span>
                    <select
                        className="p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                        onChange={(e) => changeLanguage(e.target.value)}
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                    <button className="bg-gold-400 text-blue-900 px-4 py-2 rounded-md hover:bg-gold-500 transition font-semibold" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? t('lightMode') : t('darkMode')}
                    </button>
                </div>
            </header>

            <div className="p-6 sm:p-4">
                {loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-30">
                        <div className="w-12 h-12 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row border-b border-gray-200 dark:border-gray-700 mb-6">
                    {['upload', 'view', 'generate', 'live', 'decrees', 'schedule', 'analytics', "scripture", "feedback", "prayer"].map(tab => (
                        <button
                            key={tab}
                            className={`px-6 py-2 text-lg font-semibold ${activeTab === tab ? 'border-b-4 border-gold-400 text-gold-400' : 'text-gray-600 dark:text-gray-300 hover:text-gold-400'} ${tab}-tab`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {t(`${tab}Tab`)}
                        </button>
                    ))}
                </div>

                {activeTab === 'upload' && (
                    <section className="bg-white dark:bg-gray-800 p-6 sm:p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('uploadSection')}</h2>
                        <UploadFile onUploadSuccess={handleUploadSuccess} customThemes={customThemes} />
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder={t('addTheme')}
                                className="p-2 border rounded-md mr-2 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                onKeyPress={(e) => e.key === 'Enter' && addCustomTheme(e.target.value) && (e.target.value = '')}
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => addCustomTheme(document.querySelector('input').value)}>{t('addTheme')}</button>
                        </div>
                        {Object.entries(uploadStatus).map(([jobName, status]) => (
                            <p key={jobName} className="text-sm text-gray-600 dark:text-gray-300 mt-2">Job {jobName}: {status}</p>
                        ))}
                    </section>
                )}

                {activeTab === 'view' && (
                    <section className="bg-white dark:bg-gray-800 p-6 sm:p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('viewSection')}</h2>
                        <select
                            className="p-2 border rounded-md w-full mb-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                            value={selectedTheme}
                            onChange={(e) => setSelectedTheme(e.target.value)}
                        >
                            <option value="All">All Themes</option>
                            {['Joy', 'Faith', 'Victory', 'Grace', 'Suffering', 'Uncategorized', ...customThemes].map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        <ListFiles theme={selectedTheme} onThemeUpdate={fetchTranscripts} />
                    </section>
                )}

                {activeTab === 'generate' && (
                    <section className="bg-white dark:bg-gray-800 p-6 sm:p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('generateSection')}</h2>
                        <div className="space-y-4">
                            <textarea
                                className="w-full p-3 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                rows="3"
                                value={sermonText}
                                onChange={(e) => setSermonText(e.target.value)}
                                placeholder="Enter sermon text here..."
                            />
                            <select
                                className="p-2 border rounded-md mr-2 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                value={styleName}
                                onChange={(e) => setStyleName(e.target.value)}
                            >
                                <option value="Bold Decree">Bold Decree</option>
                                <option value="Gentle Grace">Gentle Grace</option>
                            </select>
                            <div className="flex flex-wrap gap-4">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={convertSermon}>{t('convertSermon')}</button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={generateSocialPosts}>{t('generateSocialPosts')}</button>
                                {socialPosts.xPost && (
                                    <button className="bg-gold-400 text-white px-4 py-2 rounded-md hover:bg-gold-500 transition" onClick={() => setShowPreview(true)}>{t('previewPosts')}</button>
                                )}
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={generatePrayer}>{t('generatePrayer')}</button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={generateDevotional}>{t('generateDevotional')}</button>
                                <div className="flex items-center">
                                    <input id="ebookTitle" className="p-2 border rounded-md mr-2 text-gray-700 dark:text-gray-200 dark:bg-gray-700" placeholder="Ebook Title" />
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={generateEbook}>{t('generateEbook')}</button>
                                </div>
                                <div className="flex items-center">
                                    <input id="lyricsTheme" className="p-2 border rounded-md mr-2 text-gray-700 dark:text-gray-200 dark:bg-gray-700" placeholder="Theme" />
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={generateLyrics}>{t('generateLyrics')}</button>
                                </div>
                                <div className="flex items-center">
                                    <input id="quotesTopic" className="p-2 border rounded-md mr-2 text-gray-700 dark:text-gray-200 dark:bg-gray-700" placeholder="Topic" />
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={findQuotes}>{t('findQuotes')}</button>
                                </div>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={exportToPDF}>{t('exportPDF')}</button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition" onClick={clearStyle}>{t('clearStyle')}</button>
                                <select
                                    className="p-2 border rounded-md mr-2 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                    value={selectedTranscript}
                                    onChange={(e) => setSelectedTranscript(e.target.value)}
                                >
                                    <option value="">Select Transcript (optional)</option>
                                    {filteredTranscripts.map(t => (
                                        <option key={t.key} value={t.key}>{t.key}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('manageTemplates')}</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <select
                                            className="p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                            value={templatePlatform}
                                            onChange={(e) => setTemplatePlatform(e.target.value)}
                                        >
                                            <option value="X">{t('platform')}: X</option>
                                            <option value="Facebook">{t('platform')}: Facebook</option>
                                            <option value="Instagram">{t('platform')}: Instagram</option>
                                        </select>
                                        <input
                                            id="templateName"
                                            className="p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                            placeholder={t('templateName')}
                                        />
                                        <input
                                            id="templateContent"
                                            className="p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                            placeholder={t('templateContent')}
                                        />
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={saveTemplate}>{t('saveTemplate')}</button>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <select
                                            className="p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                            value={selectedTemplate}
                                            onChange={(e) => setSelectedTemplate(e.target.value)}
                                        >
                                            <option value="">{t('selectTemplate')}</option>
                                            {socialTemplates[templatePlatform]?.map(template => (
                                                <option key={template.name} value={template.name}>{template.name}</option>
                                            ))}
                                        </select>
                                        {selectedTemplate && (
                                            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition" onClick={() => deleteTemplate(selectedTemplate)}>{t('deleteTemplate')}</button>
                                        )}
                                    </div>
                                    {socialTemplates[templatePlatform]?.length > 0 ? (
                                        <ul className="space-y-2 mt-2">
                                            {socialTemplates[templatePlatform].map(template => (
                                                <li key={template.name} className="text-gray-600 dark:text-gray-300">{template.name}: {template.template}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600 dark:text-gray-300">{t('noTemplates')}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'live' && (
                    <section className="bg-white dark:bg-gray-800 p-6 sm:p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('liveSection')} {isOnline ? '' : '(Offline Mode)'}</h2>
                        <textarea
                            className="w-full p-3 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                            rows="5"
                            value={rawLiveSermonText}
                            onChange={(e) => setRawLiveSermonText(e.target.value)}
                            placeholder="Type your sermon here to see it in your style live..."
                        />
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                            <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{liveConverted || 'Start typing to see your style!'}</pre>
                        </div>
                    </section>
                )}

                {activeTab === 'decrees' && (
                    <section className="bg-white dark:bg-gray-800 p-6 sm:p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('decreesSection')}</h2>
                        <textarea
                            className="w-full p-3 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                            rows="3"
                            value={decreeInput}
                            onChange={(e) => setDecreeInput(e.target.value)}
                            placeholder="Enter decree text here..."
                        />
                        <div className="flex gap-4 mt-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={saveDecree}>{t('saveDecree')}</button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={generateDecree}>{t('generateDecree')}</button>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('savedDecrees')}</h3>
                            {decrees.length > 0 ? (
                                <ul className="space-y-2">
                                    {decrees.map((decree, index) => (
                                        <li key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200">{decree}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-300">{t('noDecrees')}</p>
                            )}
                        </div>
                    </section>
                )}

                {activeTab === 'schedule' && (
                    <section className="bg-white dark:bg-gray-800 p-6 sm:p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('scheduleSection')}</h2>
                        <div className="space-y-4">
                            <select
                                className="p-2 border rounded-md w-full text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                value={selectedTranscript}
                                onChange={(e) => setSelectedTranscript(e.target.value)}
                            >
                                <option value="">Select Transcript</option>
                                {filteredTranscripts.map(t => (
                                    <option key={t.key} value={t.key}>{t.key}</option>
                                ))}
                            </select>
                            <input
                                type="datetime-local"
                                id="scheduleDateTime"
                                className="p-2 border rounded-md w-full text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                            />
                            <div className="flex gap-4">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={() => schedulePost('X')}>{t('scheduleX')}</button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={() => schedulePost('Facebook')}>{t('scheduleFB')}</button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={() => schedulePost('Instagram')}>{t('scheduleIG')}</button>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('scheduledPosts')}</h3>
                                {scheduledPosts.length > 0 ? (
                                    <ul className="space-y-2">
                                        {scheduledPosts.map((post, index) => (
                                            <li key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200">
                                                {post.platform} - {post.transcriptKey} at {new Date(post.dateTime).toLocaleString()}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-300">{t('noScheduledPosts')}</p>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'analytics' && (
                    <section className="bg-white dark:bg-gray-800 p-6 sm:p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('analyticsSection')}</h2>
                        <div className="space-y-6">
                            <select
                                className="p-2 border rounded-md w-full text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                value={selectedTranscript}
                                onChange={(e) => setSelectedTranscript(e.target.value)}
                            >
                                <option value="">Select Transcript to Analyze</option>
                                {filteredTranscripts.map(t => (
                                    <option key={t.key} value={t.key}>{t.key}</option>
                                ))}
                            </select>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={analyzeSermon}>{t('analyzeSermon')}</button>
                            {insights.themes.length > 0 && (
                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">{t('sermonInsights')}</h3>
                                    <p className="text-gray-800 dark:text-gray-200"><strong>{t('topThemes')}:</strong> {insights.themes.join(', ')}</p>
                                    <p className="text-gray-800 dark:text-gray-200"><strong>{t('scriptures')}:</strong> {insights.scriptures.join(', ')}</p>
                                </div>
                            )}
                            <div className="mt-6">
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'scripture' && (
                    <section className="bg-white dark:bg-gray-800 p-6 sm:p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('scriptureSection')}</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                className="p-2 border rounded-md w-full text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                placeholder="Enter scripture reference (e.g., John 3:16)"
                                value={scriptureQuery}
                                onChange={(e) => setScriptureQuery(e.target.value)}
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={fetchScripture}>{t('fetchScripture')}</button>
                            {scriptureResult && (
                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                                    <p className="text-gray-800 dark:text-gray-200">{scriptureResult}</p>
                                    <div className="flex gap-4 mt-2">
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={() => insertScripture('sermonText')}>{t('insertSermon')}</button>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={() => insertScripture('decreeInput')}>{t('insertDecree')}</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {activeTab === 'feedback' && (
                    <section className="bg-white dark:bg-gray-800 p-6 sm:p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('feedbackSection')}</h2>
                        <FeedbackForm onSubmit={fetchFeedback} />
                        <div className="mt-6">
                            <Bar data={feedbackChartData} options={feedbackChartOptions} />
                        </div>
                        <div className="mt-6 space-y-4">
                            {Object.entries(feedbackAnalytics.sermons || {}).map(([sermonKey, data]) => (
                                <div key={sermonKey} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{sermonKey}</h3>
                                    <p className="text-gray-800 dark:text-gray-200"><strong>{t('averageRating')}:</strong> {data.averageRating}</p>
                                    <p className="text-gray-800 dark:text-gray-200"><strong>{t('numberComments')}:</strong> {data.commentCount}</p>
                                    <p className="text-gray-800 dark:text-gray-200"><strong>{t('recentComments')}:</strong></p>
                                    <ul className="list-disc pl-5">
                                        {data.comments.map((comment, index) => (
                                            <li key={index} className="text-gray-800 dark:text-gray-200">{comment}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'prayer' && (
                    <section className="bg-white dark:bg-gray-800 p-6 sm:p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('prayerSection')}</h2>
                        <PrayerRequestForm onSubmit={fetchPrayerRequests} />
                        <div className="mt-6 space-y-4">
                            {prayerRequests.map((prayer, index) => (
                                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                                    <p className="text-gray-800 dark:text-gray-200"><strong>{prayer.name}</strong> ({new Date(prayer.timestamp).toLocaleString()})</p>
                                    <p className="text-gray-800 dark:text-gray-200">{prayer.request}</p>
                                    <p className="text-gray-800 dark:text-gray-200"><strong>Status:</strong> {prayer.status}</p>
                                    <select
                                        className="p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700 mt-2"
                                        value={prayer.status}
                                        onChange={(e) => updatePrayerStatus(prayer, e.target.value)}
                                    >
                                        <option value="pending">{t('pending')}</option>
                                        <option value="prayed">{t('prayed')}</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('output')}</h3>
                    <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{output || t('noOutput')}</pre>
                    {output && (
                        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={() => copyToClipboard(output)}>{t('copy')}</button>
                    )}
                </div>

                <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Backup & Restore</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={createBackup}>{t('backup')}</button>
                        <select
                            className="p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                            value={selectedBackup}
                            onChange={(e) => setSelectedBackup(e.target.value)}
                        >
                            <option value="">{t('selectBackup')}</option>
                            {backups.map(backup => (
                                <option key={backup.key} value={backup.key}>{backup.key}</option>
                            ))}
                        </select>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={restoreBackup}>{t('restore')}</button>
                    </div>
                    {backups.length === 0 && <p className="text-gray-600 dark:text-gray-300 mt-2">{t('noBackups')}</p>}
                </div>

                {toast && (
                    <div className="fixed bottom-4 right-4 bg-gold-400 text-blue-900 px-4 py-2 rounded-md shadow-lg z-20">
                        {toast}
                    </div>
                )}

                {showPreview && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('previewPosts')}</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-gray-700 dark:text-gray-200 font-semibold">X Post:</h4>
                                    <p className="text-gray-800 dark:text-gray-200">{socialPosts.xPost}</p>
                                    <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition" onClick={() => copyToClipboard(socialPosts.xPost)}>{t('copy')}</button>
                                </div>
                                <div>
                                    <h4 className="text-gray-700 dark:text-gray-200 font-semibold">Facebook Post:</h4>
                                    <p className="text-gray-800 dark:text-gray-200">{socialPosts.fbPost}</p>
                                    <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition" onClick={() => copyToClipboard(socialPosts.fbPost)}>{t('copy')}</button>
                                </div>
                                <div>
                                    <h4 className="text-gray-700 dark:text-gray-200 font-semibold">Instagram Post:</h4>
                                    <p className="text-gray-800 dark:text-gray-200">{socialPosts.igPost}</p>
                                    <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition" onClick={() => copyToClipboard(socialPosts.igPost)}>{t('copy')}</button>
                                </div>
                            </div>
                            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition" onClick={() => setShowPreview(false)}>{t('close')}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}export default App;    