<?php

namespace App\Controller;

use App\Entity\Assign;
use App\Repository\AssignRepository;
use App\Repository\ClientRepository;
use App\Repository\ComputerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class AssignController extends AbstractController
{
    /**
     * @Route("/api/computer/attribution", name="attribution", methods={"POST"})
     */
    public function index(Request $request, SerializerInterface $serializer, ClientRepository $clientRepository, ComputerRepository $computerRepository): JsonResponse
    {
        $data     = json_decode($request->getContent(), true);
        $client   = $clientRepository->find($data['clientId']);
        $computer = $computerRepository->find($data['desktopId']);

        $date = new \DateTime($data['date']);
        $attribution = new Assign();
        $attribution->setHours($data['hours']);
        $attribution->setDate($date);
        $attribution->setClient($client);
        $attribution->setComputer($computer);
        $doctrine = $this->getDoctrine()->getManager();
        $doctrine->persist($attribution);
        $doctrine->flush();

        $responsJson = [
            "message" => "Créneau réservé",
            "content" => $attribution,
        ];

        $json = $serializer->serialize($responsJson, 'json', ['groups' => 'attrib']);
        $response = new JsonResponse($json, 200, [], true);
        return $response;
    }


    /**
     * @Route("/api/attribution/delete/{id}", name="attribution_delete", methods={"DELETE"})
     */
    public function delete(Assign $assign, EntityManagerInterface $em): Response
    {
        $em->remove($assign);
        $em->flush();
        return $this->json([
            'success' => true,
            'message' => "Suppression réussie"
        ], 200);
    }
}
