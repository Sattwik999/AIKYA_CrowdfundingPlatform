"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Camera, CreditCard, AlertCircle, CheckCircle, Loader2, Users, User, Building2, Heart, Target, Calendar, MapPin, Phone, Mail, Globe, Award, ArrowRight, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

type FundraiserType = 'individual' | 'campaign' | 'ngo' | null

interface FormData {
  // Common fields
  fundraiser_type: FundraiserType
  name: string
  story: string
  goal_amount: string
  category: string
  user_id: string
  
  // Individual specific
  aadhaar_number: string
  pan_number: string
  phone_number: string
  emergency_contact: string
  
  // Campaign specific
  campaign_title: string
  organizer_name: string
  team_size: string
  campaign_duration: string
  expected_impact: string
  
  // NGO specific
  ngo_name: string
  registration_number: string
  ngo_website: string
  ngo_email: string
  years_of_operation: string
  previous_projects: string
  
  // Common supporting docs
  supporting_doc_type: string
}

interface FileUploads {
  id_image: File | null
  selfie_image: File | null
  supporting_doc: File | null
  aadhaar_doc: File | null
  pan_doc: File | null
  ngo_certificate: File | null
}

export function StartFundraiserForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    // Common fields
    fundraiser_type: null,
    name: '',
    story: '',
    goal_amount: '',
    category: '',
    user_id: '',
    
    // Individual specific
    aadhaar_number: '',
    pan_number: '',
    phone_number: '',
    emergency_contact: '',
    
    // Campaign specific
    campaign_title: '',
    organizer_name: '',
    team_size: '',
    campaign_duration: '',
    expected_impact: '',
    
    // NGO specific
    ngo_name: '',
    registration_number: '',
    ngo_website: '',
    ngo_email: '',
    years_of_operation: '',
    previous_projects: '',
    
    // Common supporting docs
    supporting_doc_type: ''
  })

  const [files, setFiles] = useState<FileUploads>({
    id_image: null,
    selfie_image: null,
    supporting_doc: null,
    aadhaar_doc: null,
    pan_doc: null,
    ngo_certificate: null
  })

  const [isLoading, setIsLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [error, setError] = useState<string>('')

  const handleInputChange = (field: keyof FormData, value: string | FundraiserType) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (field: keyof FileUploads, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }))
  }

  const submitToBackend = async () => {
    setIsLoading(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      
      // Add text data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          formDataToSend.append(key, value.toString())
        }
      })

      // Add files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formDataToSend.append(key, file)
        }
      })

      // Submit to Prisma database via API
      const response = await fetch('/api/fundraisers/create', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        const result = await response.json()
        setVerificationResult({
          ...result.fundraiser,
          trust_score: result.fundraiser.trustScore,
          face_match: result.fundraiser.verified,
          document_verified: result.fundraiser.verified
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create fundraiser')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit fundraiser. Please try again.')
      console.error('Submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setVerificationResult(null)
    setCurrentStep(1)
    setFormData({
      fundraiser_type: null,
      name: '',
      story: '',
      goal_amount: '',
      category: '',
      user_id: '',
      aadhaar_number: '',
      pan_number: '',
      phone_number: '',
      emergency_contact: '',
      campaign_title: '',
      organizer_name: '',
      team_size: '',
      campaign_duration: '',
      expected_impact: '',
      ngo_name: '',
      registration_number: '',
      ngo_website: '',
      ngo_email: '',
      years_of_operation: '',
      previous_projects: '',
      supporting_doc_type: ''
    })
    setFiles({
      id_image: null,
      selfie_image: null,
      supporting_doc: null,
      aadhaar_doc: null,
      pan_doc: null,
      ngo_certificate: null
    })
  }

  const FileUploadCard = ({ 
    title, 
    description, 
    field, 
    icon: Icon, 
    accept = "image/*,.pdf",
    required = false
  }: {
    title: string
    description: string
    field: keyof FileUploads
    icon: any
    accept?: string
    required?: boolean
  }) => (
    <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
      <CardContent className="p-4 md:p-6 text-center">
        <Icon className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
        <h3 className="text-base md:text-lg font-semibold mb-2 flex items-center justify-center gap-2">
          {title}
          {required && <span className="text-red-500">*</span>}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">{description}</p>
        <Input
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
          className="mb-2 text-xs md:text-sm"
        />
        {files[field] && (
          <p className="text-xs md:text-sm text-green-600 flex items-center justify-center gap-1">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
            <span className="truncate">File uploaded: {files[field]?.name}</span>
          </p>
        )}
      </CardContent>
    </Card>
  )

  // Success Result Component
  if (verificationResult) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Fundraiser Created Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Trust Score</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {verificationResult.trust_score}/100
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Verification:</span>
                    <Badge className={verificationResult.face_match ? "bg-green-500" : "bg-red-500"}>
                      {verificationResult.face_match ? "✓ Verified" : "✗ Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Type:</span>
                    <Badge variant="outline">
                      {formData.fundraiser_type?.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Your {formData.fundraiser_type} fundraiser has been submitted successfully! 
                You can now view it on the browse fundraisers page.
                Trust score: {verificationResult.trust_score}/100
              </AlertDescription>
            </Alert>
            <Button 
              onClick={resetForm}
              className="w-full"
            >
              Create Another Fundraiser
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-3 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Start Your Fundraiser</h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4 md:px-0">
          Choose your fundraiser type and create a campaign that makes a difference.
        </p>
        
        {/* Progress Steps */}
        <div className="flex justify-center items-center gap-2 md:gap-4 mt-4 md:mt-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                currentStep >= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-6 md:w-12 h-1 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 md:gap-8 mt-2 text-xs text-gray-500">
          <span className={currentStep >= 1 ? 'text-blue-600' : ''}>Type</span>
          <span className={currentStep >= 2 ? 'text-blue-600' : ''}>Details</span>
          <span className={currentStep >= 3 ? 'text-blue-600' : ''}>Documents</span>
          <span className={currentStep >= 4 ? 'text-blue-600' : ''}>Review</span>
        </div>
      </div>

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Step 1: Choose Fundraiser Type */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Choose Your Fundraiser Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Individual */}
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  formData.fundraiser_type === 'individual' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleInputChange('fundraiser_type', 'individual')}
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <User className="w-12 h-12 md:w-16 md:h-16 text-blue-500 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Individual</h3>
                  <p className="text-gray-600 text-sm mb-3 md:mb-4">
                    Personal fundraisers for medical treatments, education, emergencies, and personal causes.
                  </p>
                  <div className="space-y-1 md:space-y-2 text-xs text-gray-500">
                    <div>• Medical treatments</div>
                    <div>• Educational expenses</div>
                    <div>• Emergency situations</div>
                    <div>• Personal causes</div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign */}
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  formData.fundraiser_type === 'campaign' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => handleInputChange('fundraiser_type', 'campaign')}
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <Users className="w-12 h-12 md:w-16 md:h-16 text-green-500 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Campaign</h3>
                  <p className="text-gray-600 text-sm mb-3 md:mb-4">
                    Community-driven campaigns for social causes, events, and group initiatives.
                  </p>
                  <div className="space-y-1 md:space-y-2 text-xs text-gray-500">
                    <div>• Community projects</div>
                    <div>• Social causes</div>
                    <div>• Group initiatives</div>
                    <div>• Event funding</div>
                  </div>
                </CardContent>
              </Card>

              {/* NGO */}
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  formData.fundraiser_type === 'ngo' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => handleInputChange('fundraiser_type', 'ngo')}
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <Building2 className="w-12 h-12 md:w-16 md:h-16 text-purple-500 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2">NGO</h3>
                  <p className="text-gray-600 text-sm mb-3 md:mb-4">
                    Registered non-profit organizations raising funds for institutional causes.
                  </p>
                  <div className="space-y-1 md:space-y-2 text-xs text-gray-500">
                    <div>• Registered NGOs</div>
                    <div>• Institutional causes</div>
                    <div>• Large-scale projects</div>
                    <div>• Social impact</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end mt-6">
              <Button 
                onClick={() => setCurrentStep(2)}
                disabled={!formData.fundraiser_type}
                className="flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Basic Details */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              {formData.fundraiser_type === 'individual' && 'Personal Details'}
              {formData.fundraiser_type === 'campaign' && 'Campaign Details'}
              {formData.fundraiser_type === 'ngo' && 'Organization Details'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="user_id">User ID *</Label>
                <Input
                  id="user_id"
                  value={formData.user_id}
                  onChange={(e) => handleInputChange('user_id', e.target.value)}
                  placeholder="Enter unique user ID"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="animals">Animals</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Individual Specific Fields */}
            {formData.fundraiser_type === 'individual' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone_number">Phone Number *</Label>
                    <Input
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="aadhaar_number">Aadhaar Number *</Label>
                    <Input
                      id="aadhaar_number"
                      value={formData.aadhaar_number}
                      onChange={(e) => handleInputChange('aadhaar_number', e.target.value)}
                      placeholder="Enter 12-digit Aadhaar number"
                      maxLength={12}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan_number">PAN Number *</Label>
                    <Input
                      id="pan_number"
                      value={formData.pan_number}
                      onChange={(e) => handleInputChange('pan_number', e.target.value)}
                      placeholder="Enter PAN number"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="emergency_contact">Emergency Contact</Label>
                  <Input
                    id="emergency_contact"
                    value={formData.emergency_contact}
                    onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                    placeholder="Emergency contact person and number"
                  />
                </div>
              </>
            )}

            {/* Campaign Specific Fields */}
            {formData.fundraiser_type === 'campaign' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="campaign_title">Campaign Title *</Label>
                    <Input
                      id="campaign_title"
                      value={formData.campaign_title}
                      onChange={(e) => handleInputChange('campaign_title', e.target.value)}
                      placeholder="Enter campaign title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="organizer_name">Organizer Name *</Label>
                    <Input
                      id="organizer_name"
                      value={formData.organizer_name}
                      onChange={(e) => handleInputChange('organizer_name', e.target.value)}
                      placeholder="Lead organizer name"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="team_size">Team Size</Label>
                    <Input
                      id="team_size"
                      value={formData.team_size}
                      onChange={(e) => handleInputChange('team_size', e.target.value)}
                      placeholder="Number of team members"
                    />
                  </div>
                  <div>
                    <Label htmlFor="campaign_duration">Campaign Duration</Label>
                    <Input
                      id="campaign_duration"
                      value={formData.campaign_duration}
                      onChange={(e) => handleInputChange('campaign_duration', e.target.value)}
                      placeholder="e.g., 30 days, 3 months"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="expected_impact">Expected Impact</Label>
                  <Textarea
                    id="expected_impact"
                    value={formData.expected_impact}
                    onChange={(e) => handleInputChange('expected_impact', e.target.value)}
                    placeholder="Describe the expected impact of this campaign"
                    rows={3}
                  />
                </div>
              </>
            )}

            {/* NGO Specific Fields */}
            {formData.fundraiser_type === 'ngo' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ngo_name">NGO Name *</Label>
                    <Input
                      id="ngo_name"
                      value={formData.ngo_name}
                      onChange={(e) => handleInputChange('ngo_name', e.target.value)}
                      placeholder="Enter NGO name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="registration_number">Registration Number *</Label>
                    <Input
                      id="registration_number"
                      value={formData.registration_number}
                      onChange={(e) => handleInputChange('registration_number', e.target.value)}
                      placeholder="NGO registration number"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ngo_website">Website</Label>
                    <Input
                      id="ngo_website"
                      value={formData.ngo_website}
                      onChange={(e) => handleInputChange('ngo_website', e.target.value)}
                      placeholder="https://your-ngo-website.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ngo_email">NGO Email *</Label>
                    <Input
                      id="ngo_email"
                      type="email"
                      value={formData.ngo_email}
                      onChange={(e) => handleInputChange('ngo_email', e.target.value)}
                      placeholder="contact@your-ngo.org"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="years_of_operation">Years of Operation</Label>
                  <Input
                    id="years_of_operation"
                    value={formData.years_of_operation}
                    onChange={(e) => handleInputChange('years_of_operation', e.target.value)}
                    placeholder="How many years has your NGO been operating?"
                  />
                </div>
                <div>
                  <Label htmlFor="previous_projects">Previous Projects</Label>
                  <Textarea
                    id="previous_projects"
                    value={formData.previous_projects}
                    onChange={(e) => handleInputChange('previous_projects', e.target.value)}
                    placeholder="Describe some of your previous successful projects"
                    rows={3}
                  />
                </div>
              </>
            )}

            {/* Common Fields */}
            <div>
              <Label htmlFor="goal_amount">Goal Amount (₹) *</Label>
              <Input
                id="goal_amount"
                type="number"
                value={formData.goal_amount}
                onChange={(e) => handleInputChange('goal_amount', e.target.value)}
                placeholder="Enter fundraising goal"
                required
              />
            </div>

            <div>
              <Label htmlFor="story">Your Story *</Label>
              <Textarea
                id="story"
                value={formData.story}
                onChange={(e) => handleInputChange('story', e.target.value)}
                placeholder={
                  formData.fundraiser_type === 'individual' 
                    ? "Tell your personal story. Be detailed and authentic about your situation."
                    : formData.fundraiser_type === 'campaign'
                    ? "Describe your campaign, its purpose, and why people should support it."
                    : "Describe your NGO's mission and this specific fundraising project."
                }
                rows={6}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum 50 characters. Be authentic and detailed.
              </p>
            </div>

            <div className="flex justify-between gap-3 md:gap-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1 md:gap-2 text-sm md:text-base px-3 md:px-4"
              >
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> 
                <span className="hidden sm:inline">Back</span>
                <span className="sm:hidden">←</span>
              </Button>
              <Button 
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1 md:gap-2 text-sm md:text-base px-3 md:px-4"
              >
                <span className="hidden sm:inline">Continue</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Document Uploads */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
              Document Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Common Documents */}
              <FileUploadCard
                title="Profile Photo"
                description="Clear photo for verification"
                field="selfie_image"
                icon={Camera}
                required
              />
              
              <FileUploadCard
                title="Supporting Document"
                description={
                  formData.fundraiser_type === 'individual' 
                    ? "Medical report, bills, or educational documents"
                    : formData.fundraiser_type === 'campaign'
                    ? "Project proposal or event details"
                    : "Project documentation or impact reports"
                }
                field="supporting_doc"
                icon={FileText}
                required
              />

              {/* Individual Specific Documents */}
              {formData.fundraiser_type === 'individual' && (
                <>
                  <FileUploadCard
                    title="Government ID"
                    description="Aadhaar card or other government ID"
                    field="id_image"
                    icon={CreditCard}
                    required
                  />
                  <FileUploadCard
                    title="Aadhaar Document"
                    description="Clear photo of Aadhaar card"
                    field="aadhaar_doc"
                    icon={Upload}
                    required
                  />
                  <FileUploadCard
                    title="PAN Document"
                    description="Clear photo of PAN card"
                    field="pan_doc"
                    icon={Upload}
                    required
                  />
                </>
              )}

              {/* NGO Specific Documents */}
              {formData.fundraiser_type === 'ngo' && (
                <FileUploadCard
                  title="NGO Certificate"
                  description="Registration certificate or legal documents"
                  field="ngo_certificate"
                  icon={Award}
                  required
                />
              )}
            </div>

            <div className="flex justify-between gap-3 md:gap-4 mt-6 md:mt-8">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1 md:gap-2 text-sm md:text-base px-3 md:px-4"
              >
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> 
                <span className="hidden sm:inline">Back</span>
                <span className="sm:hidden">←</span>
              </Button>
              <Button 
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-1 md:gap-2 text-sm md:text-base px-3 md:px-4"
              >
                <span className="hidden sm:inline">Review & Submit</span>
                <span className="sm:hidden">Review</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review & Submit */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
              Review Your Fundraiser
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg space-y-3 md:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-semibold">Fundraiser Summary</h3>
                <Badge className="capitalize text-xs md:text-sm">
                  {formData.fundraiser_type}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                <div>
                  <span className="font-medium">Name/Title:</span> 
                  <span className="ml-1">
                    {formData.fundraiser_type === 'individual' && formData.name}
                    {formData.fundraiser_type === 'campaign' && formData.campaign_title}
                    {formData.fundraiser_type === 'ngo' && formData.ngo_name}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Goal:</span> <span className="ml-1">₹{formData.goal_amount}</span>
                </div>
                <div>
                  <span className="font-medium">Category:</span> <span className="ml-1">{formData.category}</span>
                </div>
                <div>
                  <span className="font-medium">User ID:</span> <span className="ml-1">{formData.user_id}</span>
                </div>
              </div>
              
              <div>
                <span className="font-medium text-xs md:text-sm">Story:</span>
                <p className="text-gray-600 mt-1 text-xs md:text-sm">{formData.story.substring(0, 200)}...</p>
              </div>
            </div>

            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                By submitting, you agree to our terms of service and verification process. 
                Your fundraiser will be reviewed and assigned a trust score based on the information provided.
              </AlertDescription>
            </Alert>

            <div className="flex justify-between gap-3 md:gap-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1 md:gap-2 text-sm md:text-base px-3 md:px-4"
              >
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> 
                <span className="hidden sm:inline">Back</span>
                <span className="sm:hidden">←</span>
              </Button>
              <Button 
                onClick={submitToBackend}
                disabled={
                  isLoading || 
                  !formData.story || 
                  !formData.goal_amount ||
                  !files.selfie_image ||
                  !files.supporting_doc ||
                  (formData.fundraiser_type === 'individual' && (!files.id_image || !files.aadhaar_doc || !files.pan_doc)) ||
                  (formData.fundraiser_type === 'ngo' && !files.ngo_certificate)
                }
                className="flex items-center gap-1 md:gap-2 px-4 md:px-8 text-sm md:text-base"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 animate-spin" />
                    <span className="hidden sm:inline">Creating Fundraiser...</span>
                    <span className="sm:hidden">Creating...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Submit Fundraiser</span>
                    <span className="sm:hidden">Submit</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}